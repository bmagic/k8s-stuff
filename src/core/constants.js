module.exports.states = Object.freeze({
  init: 'INIT',
  adding: 'ADDING',
  building: 'BUILDING',
  configuring: 'CONFIGURING',
  running: 'RUNNING',
  error: 'ERROR',
  deleting: 'DELETING'
})

module.exports.events = Object.freeze({
  k8s_add: 'K8S_ADD',
  add_instance: 'ADD_INSTANCE',
  check_instance_status: 'CHECK_INSTANCE_STATUS',
  configure_instance: 'CONFIGURE_INSTANCE',
  send_mail: 'SEND_MAIL'
})
