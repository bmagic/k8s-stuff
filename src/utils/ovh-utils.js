
const OVH_API_APP_KEY = process.env.OVH_API_APP_KEY
const OVH_API_APP_SECRET = process.env.OVH_API_APP_SECRET
const OVH_API_CONSUMER_KEY = process.env.OVH_API_CONSUMER_KEY
const OVH_CLOUD_PROJECT_ID = process.env.OVH_CLOUD_PROJECT_ID
const OVH_REGION = process.env.OVH_REGION

const ovh = require('ovh')({
  endpoint: 'ovh-eu',
  appKey: OVH_API_APP_KEY,
  appSecret: OVH_API_APP_SECRET,
  consumerKey: OVH_API_CONSUMER_KEY
})

module.exports.addInstance = async function (id) {
  const flavorId = await getAvailableFlavorId()
  const instance = await postInstance(id, flavorId)
  return instance
}

module.exports.getInstance = async function (instanceId) {
  global.logger.debug({module: 'ovh-utils'}, `/cloud/project/${OVH_CLOUD_PROJECT_ID}/instance/${instanceId}`)
  const instance = await ovh.requestPromised('GET', `/cloud/project/${OVH_CLOUD_PROJECT_ID}/instance/${instanceId}`)
  return instance
}

async function getAvailableFlavorId () {
  // S1-2 (2Go RAM 1vCore 0.012€/H) : eeb4ccc9-faa0-4afb-955e-6a0224f93055
  // G1-15 (15Go RAM 4vCore GTX1070 0.478€/H) : 989a9a6c-2404-472b-8530-f4cd42abf98d
  // G1-30 (30Go RAM 8vCore GTX1070 0.653€/H) : 31c9e2b5-24dc-4ce3-b851-1d130acb7eed
  const flavorIds = ['eeb4ccc9-faa0-4afb-955e-6a0224f93055', '989a9a6c-2404-472b-8530-f4cd42abf98d', '31c9e2b5-24dc-4ce3-b851-1d130acb7eed']
  for (let flavorId of flavorIds) {
    global.logger.debug({module: 'ovh-utils'}, `OVH API GET /cloud/project/${OVH_CLOUD_PROJECT_ID}/flavor/${flavorId}`)
    const flavor = await ovh.requestPromised('GET', `/cloud/project/${OVH_CLOUD_PROJECT_ID}/flavor/${flavorId}`)
    if (flavor.available) {
      global.logger.debug({module: 'ovh-utils'}, `Flavor ${flavor.id} is available`)
      return flavor.id
    }
  }
  throw new Error('OUPS none of the flavors are available....')
}

async function postInstance (id, flavorId) {
  global.logger.debug({module: 'ovh-utils'}, `OVH API POST /cloud/project/${OVH_CLOUD_PROJECT_ID}/instance`)
  const instance = await ovh.requestPromised('POST', `/cloud/project/${OVH_CLOUD_PROJECT_ID}/instance`, {
    serviceName: OVH_CLOUD_PROJECT_ID,
    flavorId: flavorId,
    imageId: 'ea97b799-40eb-4f0e-a385-b25f647142c3',
    name: id,
    networks: [
      {networkId: 'bc63b98d13fbba642b2653711cc9d156ca7b404d2df009f7227172d37b5280a6'},
      {networkId: 'pn-10198_0'}
    ],
    sshKeyId: '516d467764476c7a6447553d',
    region: OVH_REGION
  })
  return instance
}
