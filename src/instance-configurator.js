const { events, states } = require('./core/constants')
const ObjectID = require('mongodb').ObjectID
const NodeSsh = require('node-ssh')

module.exports.start = () => {
  const collection = global.db.collection('nodes')

  global.emitter.on(events.configure_node, async (id) => {
    try {
      global.logger.info({module: 'instance-configurator'}, `The instance ${id} is added, I will configure it`)
      const node = await collection.findOne({_id: ObjectID(id)}, {projection: {data: 1}})
      const instance = node.data

      await collection.updateOne({_id: ObjectID(id)}, {$set: { state: states.configuring }})

      // Activate Private IP
      for (const index in instance.ipAddresses) {
        const ipAddress = instance.ipAddresses[index]
        if (ipAddress.type === 'public' && ipAddress.version === 4) {
          const ssh = new NodeSsh()
          await ssh.connect({host: ipAddress.ip,
            username: 'ubuntu',
            privateKey: 'C:\\Users\\Baptiste\\Desktop\\keys\\baptiste_vodalys2.openssh',
            passphrase: ''})

          global.logger.debug({module: 'instance-configurator'}, `Upload script directory on node ${id}`)
          await ssh.putDirectory('./src/scripts', '/home/ubuntu/scripts')

          global.logger.debug({module: 'instance-configurator'}, `Init install on node ${id}`)
          const commandResult = await ssh.execCommand(`sudo sh scripts/init.sh`)
          if (commandResult.stderr !== undefined && commandResult.stderr !== '') {
            global.logger.error({module: 'instance-configurator'}, commandResult.stderr)
            throw new Error(`Erreur lors de l'execution du script d'init sur la node ${id}`)
          }
          global.logger.debug({module: 'instance-configurator'}, commandResult.stdout)

          await collection.updateOne({_id: ObjectID(id)}, {$set: { state: states.configured }})
          global.emitter.emit(events.configured_node, id)
        }
      }
    } catch (error) {
      global.logger.error({module: 'instance-creator', err: error})
    }
  })
}
