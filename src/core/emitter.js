module.exports.createEmitter = () => {
  const EventEmitter = require('events')
  global.emitter = new EventEmitter()

  global.emitter.on('event', (...args) => {
    global.logger.silly(`Event emitted with args: ${args}`)
  })

  global.logger.info('Emitter initialized')
}
