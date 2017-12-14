const logger = require('./src/core/logger')
const mongo = require('./src/core/mongo')
const emitter = require('./src/core/emitter')

const instanceCreator = require('./src/instance-creator')
const processKeeper = require('./src/process-manager')
const k8sEventChecker = require('./src/k8s-events-checker')

// Define env
global.env = process.env.NODE_ENV || 'dev'

logger.createLogger()
emitter.createEmitter()

mongo.connect()
  .then(() => {
    instanceCreator.start()
    processKeeper.start()
    k8sEventChecker.start()
  })
  .catch((error) => global.logger.error(error))
