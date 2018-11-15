var express = require('express');
var router = express.Router();
require('dotenv').config()

var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
var discovery = new DiscoveryV1({
    version: '2018-10-15',
    iam_apikey: process.env.DISCOVERY_IAM_APIKEY,
    url: process.env.DISCOVERY_URL
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/query', function(req, res, next){
  var term = req.body.query;
  var results = "No results found";

  discovery.query(
    {
      environment_id: process.env.DISCOVERY_ENVIRONMENT_ID,
      collection_id: process.env.DISCOVERY_COLLECTION_ID,
      query: term
    },
    function(err, response) {
      if (err) {
        console.error(err);
      } else {
        results = response;
      }
      var jsonList = results.results.map(function(obj){
        return JSON.stringify(obj);
      });
      res.render('results', { 
        title: 'Express',
        term: term,
        results: jsonList
      });
    }
  );
});

module.exports = router;