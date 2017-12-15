const { events } = require('./core/constants')
const ovhUtils = require('./utils/ovh-utils')

module.exports.start = () => {
  /**
   * ON EVENT ADD_NODE
   */
  global.emitter.on(events.add_node, async (id) => {
    global.logger.info({module: 'instance-creator'}, `The instance ${id} is in state init. I will ask ovh for it.`)
    try {
      await ovhUtils.addInstance()
    } catch (error) {
      global.logger.error({module: 'instance-creator', err: error})
      global.emitter.emit(events.send_mail, 'Error in instance-creator', err.message)
    }
    // TODO ASK OVH TO ADD INSTANCE
    // TODO Change the node state to ADDING
  })

// TODO check every 10 sec the state of the instance on OVH API
}
