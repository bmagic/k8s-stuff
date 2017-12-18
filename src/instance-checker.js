const { events, states } = require('./core/constants')
const ovhUtils = require('./utils/ovh-utils')
var ObjectID = require('mongodb').ObjectID

module.exports.start = () => {
  const collection = global.db.collection('nodes')

  global.emitter.on(events.check_instance_status, async (id) => {
    try {
      global.logger.info({module: 'instance-checker'}, `The instance ${id} is building, I will check is status`)
      const node = await collection.findOne({_id: ObjectID(id)}, {projection: {data: 1}})
      const instanceId = node.data.id

      const instance = await ovhUtils.getInstance(instanceId)
      switch (instance.status) {
        case 'ACTIVE':
          global.emitter.emit(events.configure_node, id)
          break
        case 'ERROR':
          throw new Error(`A error occur during instance ${id} creation`)
        case 'BUILDING':
        default:
          global.logger.debug({module: 'instance-checker'}, `The instance ${id} is still building, I will check again soon.`)
          setTimeout(() => global.emitter.emit(events.check_instance_status, id), 5000)
      }
    } catch (error) {
      global.logger.error({module: 'instance-checker', err: error})
      global.emitter.emit(events.send_mail, 'Error in instance checker', error.message)
    }
  })
}
