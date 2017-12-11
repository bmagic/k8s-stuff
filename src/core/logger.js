
module.exports.createLogger = () => {
  const winston = require('winston')
  const LOG_LEVEL = process.env.LOG_LEVEL || 'debug'

  let format = winston.format.simple()
  if (global.env === 'production') { format = winston.format.combine(winston.format.timestamp(), winston.format.json()) }

  global.logger = winston.createLogger({
    level: LOG_LEVEL,
    format: format,
    transports: [
      new winston.transports.Console({
        handleExceptions: true
      })
    ],
    exitOnError: false
  })
  global.logger.info('Winston logger initialized')
}
