module.exports.connect = () => {
  return new Promise((resolve, reject) => {
    const MongoClient = require('mongodb').MongoClient

    const MONGO_HOST = process.env.MONGO_HOST || 'localhost'
    const MONGO_PORT = process.env.MONGO_PORT || '27017'

    // Connection URL
    const url = `mongodb://${MONGO_HOST}:${MONGO_PORT}`

    const dbName = 'k8s-manager'
    MongoClient.connect(url)
      .then((client) => {
        global.logger.info('Mongo database connected')
        global.db = client.db(dbName)
        resolve()
      })
      .catch((error) => reject(error))
  })
}
