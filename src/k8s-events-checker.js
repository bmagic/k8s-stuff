const { events } = require('./core/constants')
module.exports.start = () => {
  // Connect to k8s
  // const Api = require('kubernetes-client')
  //
  // const core = new Api.Core({
  //   url: 'https://192.168.2.2:6443',
  //   auth: {
  //     bearer: '791fa0.2806024378f04d4b'
  //   },
  //   insecureSkipTlsVerify: true,
  //   namespace: 'production'
  //
  // })
  // core.ns.pod.get((obj) => console.log(obj))

  // setInterval(() => {
  //   global.emitter.emit(events.k8s_add)
  // }, 2000)
}
