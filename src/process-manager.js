const {states, events} = require('./core/constants')

module.exports.start = async () => {
  const collection = global.db.collection('nodes')

  try {
    // Node state is init then dispatch node.add
    const nodes = await collection.find({state: states.init}, {projection: {_id: 1}}).toArray()
    nodes.forEach((node) => global.emitter.emit(events.add_node, node._id))
  } catch (error) {
    global.logger.error({module: 'process-manager', err: error})
  }
  // TODO CHECK ADDING STATE AND DISPATCH adding_node event

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
