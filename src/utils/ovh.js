const ovh = require('ovh')

const OVH_API_APP_KEY = process.env.OVH_API_APP_KEY
const OVH_API_APP_SECRET = process.env.OVH_API_APP_SECRET
const OVH_API_CONSUMER_KEY = process.env.OVH_API_CONSUMER_KEY

// G1-15 : 989a9a6c-2404-472b-8530-f4cd42abf98d
// G1-30 : 31c9e2b5-24dc-4ce3-b851-1d130acb7eed
const flavorIds = ['989a9a6c-2404-472b-8530-f4cd42abf98d']

module.exports.addInstance = function () {
  // TODO Get the flavors and check for disponitibiliy
  console.log(flavorIds)
}

function getFlavors () {
  return new Promise((resolve, reject) => {

  })
}
