const { events } = require('./core/constants')
const ovhUtils = require('./utils/ovh-utils')

module.exports.start = () => {
  /**
   * ON EVENT NODE_ADD
   */
  global.emitter.on(events.node_add, async (id) => {
    global.logger.info(`[instance-creator] The instance ${id} is in state init. I will ask ovh for it.`)
    try {
      await ovhUtils.addInstance()
    } catch (error) {
      global.logger.error(`[instance-creator] ${error.message || error}`)
    }
    // TODO ASK OVH TO ADD INSTANCE
    // TODO Change the node state to ADDING
  })

  // TODO check every 10 sec the state of the instance on OVH API
}
