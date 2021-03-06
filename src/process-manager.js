const {states, events} = require('./core/constants')

module.exports.start = async () => {
  const collection = global.db.collection('nodes')

  /**
   * ON EVENT K8S_ADD
   */
  global.emitter.on(events.k8s_add, async () => {
    try {
      const count = await collection.count({$and: [{state: {$ne: states.running}}, {state: {$ne: states.error}}]})
      if (count === 0) {
        const node = await collection.insertOne({state: states.init})
        global.emitter.emit(events.add_node, node.insertedId)
      } else {
        global.logger.debug({module: 'process-manager'}, 'A node is already plan to arrive. I wait.')
      }
    } catch (error) {
      global.logger.error({module: 'process-manager', err: error})
    }
  })
}
