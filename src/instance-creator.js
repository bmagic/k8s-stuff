module.exports.start = () => {
  setInterval(() => {
    console.log('Instance Creator')
    global.emitter.emit('event')
  }, 1000)
}
