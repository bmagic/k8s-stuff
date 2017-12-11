const ovh = require('ovh')
const winston = require('winston')

const ampq = require('amqplib')
const OVH_API_APP_KEY = process.env.OVH_API_APP_KEY
const OVH_API_APP_SECRET = process.env.OVH_API_APP_SECRET
const OVH_API_CONSUMER_KEY = process.env.OVH_API_CONSUMER_KEY
const LOG_LEVEL = process.env.LOG_LEVEL || 'debug'
const OVH_API_CLOUD_PROJECT = process.env.OVH_API_CLOUD_PROJECT

// let ovhApi = new OvhApi({OVH_API_APP_KEY, OVH_API_APP_SECRET, OVH_API_CONSUMER_KEY})
// ovhApi.cloudProject = OVH_API_CLOUD_PROJECT
// ovhApi.getInstances()
//   .then(instances => console.log(`Found ${instances.length} instance(s)`))
//   .catch(error => console.error(error))

const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console({
      handleExceptions: true
    })
  ],
  exitOnError: false
})

const q = 'tasks'

const open = ampq.connect('amqp://192.168.1.10')

open.then(function (conn) {
  return conn.createChannel()
}).then(function (ch) {
  return ch.assertQueue(q).then(function (ok) {
    return ch.consume(q, function (msg) {
      if (msg !== null) {
        if (msg.content.toString() === 'ADD_NODE') {
          addInstance()
            // .then(ch.ack(msg))
            .catch((error) => logger.error(error.message))
        }
        // ch.ack(msg)
      }
    })
  })
}).catch(console.error)

function addInstance () {
  return new Promise((resolve, reject) => {
    logger.info('A new instance is required !!!')

    /*
      API GET INSTANCE_COUNT
        IF INSTANCE_COUNT < MAX
          API ADD INSTANCE

        ELSE
          REJECT("MAX NODE")
     */
  })
}
