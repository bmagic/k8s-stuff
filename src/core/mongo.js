module.exports.connect = async () => {
  const MongoClient = require('mongodb').MongoClient

  const MONGO_HOST = process.env.MONGO_HOST
  const MONGO_PORT = process.env.MONGO_PORT
  const url = `mongodb://${MONGO_HOST}:${MONGO_PORT}`
  const dbName = 'k8s-manager'

  const client = await MongoClient.connect(url)

  global.logger.info('Mongo database connected')
  global.db = client.db(dbName)
}
