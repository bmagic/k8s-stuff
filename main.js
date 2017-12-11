const logger = require('./src/core/logger')
const mongo = require('./src/core/mongo')
const emitter = require('./src/core/emitter')
const instanceCreator = require('./src/instance-creator')
const processKeeper = require('./src/process-manager')

// Define env
global.env = process.env.NODE_ENV || 'dev'

// Initialise Logger
logger.createLogger()

// Initialise Emitter
emitter.createEmitter()

// Initialise mongodb
mongo.connect()
  .then(() => {
    instanceCreator.start()
    processKeeper.start()
  })
  .catch((error) => global.logger.error(error))
