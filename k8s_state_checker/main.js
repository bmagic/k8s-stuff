const amqp = require('amqplib')

const q = 'tasks'

var open = amqp.connect('amqp://192.168.1.10')



open.then(function (conn) {
  return conn.createChannel()
}).then(function (ch) {
    return ch.assertQueue(q).then(function (ok) {
      console.log('ADD TO QUEUE')
      return ch.sendToQueue(q, Buffer.from('ADD_NODE'))
    })
}).catch(console.warn)
