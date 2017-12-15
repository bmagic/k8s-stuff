require('dotenv').config()

const logger = require('./src/core/logger')
const mongo = require('./src/core/mongo')
const emitter = require('./src/core/emitter')

const instanceCreator = require('./src/instance-creator')
const processManager = require('./src/process-manager')
const k8sEventChecker = require('./src/k8s-events-checker')
const mailSender = require('./src/mail-sender')

// Define env
global.env = process.env.NODE_ENV || 'dev'

async function start () {
  logger.createLogger()
  emitter.createEmitter()

  await mongo.connect()

  mailSender.start()
  instanceCreator.start()
  k8sEventChecker.start()

  await processManager.start()
}

start().catch(error => global.logger.error({err: error}))
