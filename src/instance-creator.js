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
      // TODO Dispatch event on added node
    } catch (error) {
      global.logger.error({module: 'instance-creator', err: error})
      global.emitter.emit(events.send_mail, 'Error in instance-creator', error.message)
    }
  })

  global.emitter.on(events.adding_node, async () => {
    // TODO Start Loop on checking instance
    // If state = build
    //    setTimeout 10 sec and emit adding_node
    // Else state = error
    //    update mongo to ERROR
    //    emit send_mail
    // Else state = success
    //    Update mongo to added
    //    emit added_node
  })
}
