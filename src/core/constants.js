module.exports.states = Object.freeze({
  init: 'INIT',
  adding: 'ADDING',
  added: 'ADDED',
  configuring: 'CONFIGURING',
  configured: 'CONFIGURED',
  running: 'RUNNING',
  error: 'ERROR',
  deleting: 'DELETING',
  deleted: 'DELETED'
})

module.exports.events = Object.freeze({
  k8s_add: 'K8S_ADD',
  add_node: 'ADD_NODE',
  send_mail: 'SEND_MAIL'
})
