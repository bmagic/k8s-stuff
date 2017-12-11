module.exports = class OvhApi {
  constructor (args) {
    let {OVH_API_END_POINT = 'ovh-eu', OVH_API_APP_KEY, OVH_API_APP_SECRET, OVH_API_CONSUMER_KEY} = args
    this._ovh = require('ovh')({
      endpoint: OVH_API_END_POINT,
      appKey: OVH_API_APP_KEY,
      appSecret: OVH_API_APP_SECRET,
      consumerKey: OVH_API_CONSUMER_KEY
    })
  }

  set cloudProject (cloudProject) {
    this._cloudProject = cloudProject
  }

  async getInstances () {
    const instances = await this._ovh.requestPromised('GET', `/cloud/project/${this._cloudProject}/instance`)
    return instances
  }
}
