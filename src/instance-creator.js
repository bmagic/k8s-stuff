const { events, states } = require('./core/constants')
const ovhUtils = require('./utils/ovh-utils')
var ObjectID = require('mongodb').ObjectID

module.exports.start = () => {
  const collection = global.db.collection('nodes')

  /**
   * ON EVENT ADD_NODE
   */
  global.emitter.on(events.add_node, async (id) => {
    global.logger.info({module: 'instance-creator'}, `The instance ${id} is in state init. I will ask ovh for it.`)
    try {
      const instance = await ovhUtils.addInstance(id)
      await collection.updateOne({_id: ObjectID(id)}, {$set: {state: states.adding, data: instance}})
    } catch (error) {
      global.logger.error({module: 'instance-creator', err: error})
      global.emitter.emit(events.send_mail, 'Error in instance-creator', error.message)
    }
  })

// TODO check every 10 sec the state of the instance on OVH API
}

