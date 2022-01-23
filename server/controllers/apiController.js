const axios = require('axios');

const ipstackKey = '1834644106af119462bd28f01eeac372';
const googleKey = 'AIzaSyC7QGTlwQzORmFtoGuCwjQuexQ3jHCV8us';
const vpnapikey = 'facc450fe0f24171b0ed2505289ff4fa';

const api = {};

api.vpnApi = (req, res, next) => {
  const ip = req.body.ip;
  axios.get('https://vpnapi.io/api/' + ip, {
    params: {
      key: vpnapikey
    }
  })
  .then(response => {
    res.locals.vpnApi = response.data.security;
    return next();
  })
  .catch(err => console.log(err));
};

api.reverseGeocode = (req, res, next) => {

  const lat = res.locals.ipStack.latitude;
  const long = res.locals.ipStack.longitude;
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      latlng: `${lat},${long}`,
      key: googleKey
    }
  })
  .then(response => {
    res.locals.formatted_address = response.data.results[0].formatted_address;
    return next();
  })
  .catch(err => console.log(err))

};

api.callIpStack = (req, res, next) => {
  const ip = req.body.ip;

  axios.get('https://api.ipstack.com/' + ip, {
       params: { access_key: ipstackKey }
  })
  .then(response => {
    res.locals.ipStack = {...response.data};
    next();
  })
  .catch(err => console.log(err));

};

api.verifySafety = (req, res, next) => {
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

  axios({ method: 'post',
    url: 'https://safebrowsing.googleapis.com/v4/threatMatches:find?key=' + googleKey,
    headers: {'Content-Type': 'application/json'},
    data: {
      client: googleBody.client,
      threatInfo: googleBody.threatInfo
    }
  })
  .then(response => {
    if (response.data.matches) res.locals.safetyInfo = response.data.matches;
    else res.locals.safetyInfo = undefined;
    next();
  })
  .catch(error => next(error));
};

module.exports = api;