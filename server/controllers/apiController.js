const axios = require('axios');
const urlController = require('./urlController');

const ipstackKey = '1834644106af119462bd28f01eeac372';
const googleKey = 'AIzaSyC7QGTlwQzORmFtoGuCwjQuexQ3jHCV8us';
const vpnapikey = 'facc450fe0f24171b0ed2505289ff4fa';

const api = {};

api.processFrontEndData = (req, res, next) => {
  console.log(req.body);
  res.send('ok');
};

api.vpnApi = (req, res, next) => {
  const ip = '173.95.50.147';
  axios.get('https://vpnapi.io/api/' + ip, {
    params: {
      key: vpnapikey
    }
  })
  .then(response => console.log(response.data.security))
  .catch(err => console.log(err));
};

api.reverseGeocode = (req, res, next) => {

  const lat = '35.996910095214844'
  const long = '-78.91059875488281'
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
    latlng: `${lat},${long}`,
    key: googleKey
    }
  })
  .then(response => console.log(response.data.results[0].formatted_address))
  .catch(err => console.log(err))

};

api.callIpStack = (req, res, next) => {
  const ip = '173.95.50.147';

  axios.get('https://api.ipstack.com/' + ip, {
       params: { access_key: ipstackKey }
  })
  .then(response => console.log(response.data))
  .catch(err => console.log(err));

};

api.verifySafety = (req, res, next) => {

  if (!res.locals.destination_url) {
    return next();
  }

  const googleBody =  {
    "client": {
      "clientId": "urlguard_io",
      "clientVersion": "1.0.0"
    },
    "threatInfo": {
      "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
      "platformTypes": ["ANY_PLATFORM"],
      "threatEntryTypes": ["URL"],
      "threatEntries": [
        {"url": res.locals.urlInfo.destination_url }
      ]
    }
  };

  axios({
    method: 'post',
    url: 'https://safebrowsing.googleapis.com/v4/threatMatches:find?key=' + googleKey,
    data: {
      client: googleBody.client,
      threatInfo: googleBody.threatInfo
    },
    headers: {'Content-Type': 'application/json'}
  })
  .then(function (response) {
    console.log(response.data);
    if (response.data.matches) {
      res.locals.safetyInfo = response.data.matches;
    } else {
      res.locals.safetyInfo = undefined;
    }
    return next();
  })
  .catch(function (error) {
    console.log(error);
    return next();
  });
  
};

module.exports = api;