require('dotenv').config()

const logger = require('./src/core/logger')
const mongo = require('./src/core/mongo')
const emitter = require('./src/core/emitter')

const instanceCreator = require('./src/instance-creator')
const instanceChecker = require('./src/instance-checker')
const instanceConfigurator = require('./src/instance-configurator')
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
  k8sEventChecker.start()
  instanceCreator.start()
  instanceChecker.start()
  instanceConfigurator.start()

  await processManager.start()
}

start().catch(error => global.logger.error({err: error}))
