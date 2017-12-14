
const OVH_API_APP_KEY = process.env.OVH_API_APP_KEY
const OVH_API_APP_SECRET = process.env.OVH_API_APP_SECRET
const OVH_API_CONSUMER_KEY = process.env.OVH_API_CONSUMER_KEY
const OVH_CLOUD_PROJECT_ID = process.env.OVH_CLOUD_PROJECT_ID
const OVH_REGION = process.env.OVH_REGION || 'GRA3'

module.exports.addInstance = async function () {
  // TODO Get the flavors and check for disponitibiliy
  const flavorId = await getFlavor()
  console.log(flavorId)
}

async function getFlavor () {
  const ovh = require('ovh')({
    endpoint: 'ovh-eu',
    appKey: OVH_API_APP_KEY,
    appSecret: OVH_API_APP_SECRET,
    consumerKey: OVH_API_CONSUMER_KEY
  })

  // G1-15 : 989a9a6c-2404-472b-8530-f4cd42abf98d
  // G1-30 : 31c9e2b5-24dc-4ce3-b851-1d130acb7eed
  const flavorIds = ['989a9a6c-2404-472b-8530-f4cd42abf98d', '31c9e2b5-24dc-4ce3-b851-1d130acb7eed']

  for (let flavorId of flavorIds) {
    const flavor = await ovh.requestPromised('GET', `/cloud/project/${OVH_CLOUD_PROJECT_ID}/flavor/${flavorId}`)
    if (flavor.available) {
      global.logger.verbose(`[instance-creator] Flavor ${flavor.id} is available`)
      return flavor.id
    }
  }
  throw new Error('OUPS none of the flavor is available ....')
}
