module.exports.connect = () => {
  return new Promise((resolve, reject) => {
    const MongoClient = require('mongodb').MongoClient

    // Connection URL
    const url = 'mongodb://192.168.1.10:27017'

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
