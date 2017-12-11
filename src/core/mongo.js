module.exports.connect = () => {
  return new Promise((resolve, reject) => {
    const MongoClient = require('mongodb').MongoClient

    // Connection URL
    const url = 'mongodb://localhost:27017'

    const dbName = 'k8s_stuff'
    MongoClient.connect(url)
      .then((client) => {
        global.logger.info('Mongo database connected')
        global.db = client.db(dbName)
        resolve()
      })
      .catch((error) => reject(error))
  })
}
