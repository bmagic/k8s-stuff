const DEBUG_LEVEL = process.env.DEBUG_LEVEL

module.exports.createLogger = () => {
  const bunyan = require('bunyan')
  global.logger = bunyan.createLogger({
    name: 'k8s-manager',
    level: DEBUG_LEVEL,
    serializers: {
      err: bunyan.stdSerializers.err
    }
  })

  global.logger.info('Logger initialized')
}
