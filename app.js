require('dotenv').config()
var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

var discovery = new DiscoveryV1({
  version: '2018-10-15',
  iam_apikey: process.env.DISCOVERY_IAM_APIKEY,
  url: process.env.DISCOVERY_URL
});

discovery.query(
    {
      environment_id: process.env.DISCOVERY_ENVIRONMENT_ID,
      collection_id: process.env.DISCOVERY_COLLECTION_ID,
      query: 'Twitter'
    },
    function(err, response) {
      if (err) {
        console.error(err);
      } else {
        console.log(JSON.stringify(response, null, 2));
      }
    }
  );