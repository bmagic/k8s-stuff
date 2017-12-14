const {states, events} = require('./core/constants')

module.exports.start = () => {
  const collection = global.db.collection('nodes')

  // Node state is init then dispatch node.add
  collection.find({state: states.init}, {projection: {_id: 1}}).toArray()
    .then((nodes) => {
      nodes.forEach((node) => global.emitter.emit(events.node_add, node._id))
    })
    .catch((error) => global.logger.error(`[process-manager] ${error}`))

  /**
   * ON EVENT K8S_ADD
   */
  global.emitter.on(events.k8s_add, () => {
    // Check current process
    collection.count({$and: [{state: {$ne: states.running}}, {state: {$ne: states.error}}]})
      .then((count) => {
        if (count === 0) {
          const node = {
            state: states.init
          }
          return collection.insertOne(node)
        } else {
          global.logger.verbose('[process-manager] A node is already plan to arrive. I wait.')
          throw new Error()
        }
      })
      .then((node) => {
        global.emitter.emit(events.node_add, node.insertedId)
      })
      .catch((error) => {
        if (error.message) { global.logger.error(`[process-manager] ${error.message}`) }
      })
  })
}
