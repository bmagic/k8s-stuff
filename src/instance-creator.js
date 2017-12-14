const { events } = require('./core/constants')

module.exports.start = () => {
  /**
   * ON EVENT NODE_ADD
   */
  global.emitter.on(events.node_add, (id) => {
    global.logger.info(`[instance-creator] An instance is need with id:${id}, I will ask ovh for it.`)
    // TODO ASK OVH TO ADD INSTANCE
    // TODO Change the node state to ADDING
  })

  // TODO check every 10 sec the state of the instance on OVH API
}
