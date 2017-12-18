const { events, states } = require('./core/constants')
const ovhUtils = require('./utils/ovh-utils')
var ObjectID = require('mongodb').ObjectID

module.exports.start = () => {
  const collection = global.db.collection('nodes')

  global.emitter.on(events.add_node, async (id) => {
    global.logger.info({module: 'instance-creator'}, `The instance ${id} is in state init. I will ask ovh for it.`)
    try {
      await collection.updateOne({_id: ObjectID(id)}, {$set: {state: states.adding}})
      const instance = await ovhUtils.addInstance(id)
      await collection.updateOne({_id: ObjectID(id)}, {$set: {data: instance}})
      global.emitter.emit(events.check_instance_status, id)
    } catch (error) {
      global.logger.error({module: 'instance-creator', err: error})
      global.emitter.emit(events.send_mail, 'Error in instance-creator', error.message)
    }
  })
}
