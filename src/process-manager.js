module.exports.start = () => {
  global.emitter.on('event', () => {
    console.log('MOUHAHHAHAHA')
  })
}
