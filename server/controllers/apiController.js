const axios = require('axios');

const ipstackKey = '';
const googleKey = '';
const vpnapikey = '';

const api = {};

api.getLogInfo = (req, res, next) => {
  const ip = req.body.ip;
  res.locals.logs = {};
  axios.get('https://vpnapi.io/api/' + ip, {
    params: {
      key: vpnapikey
    }
  })
  .then(vpnApiResponse => {
    res.locals.vpnApi = vpnApiResponse.data.security;
    return axios.get('https://api.ipstack.com/' + ip, {params: { access_key: ipstackKey }});
  })
  .then(ipInfo => {
    res.locals.ipStack = ipInfo.data;
    next();
  })
  .catch(err => next(err));
};

api.verifySafety = (req, res, next) => {
  const googleRequestBody =  {
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
      client: googleRequestBody.client,
      threatInfo: googleRequestBody.threatInfo
    }
  })
  .then(response => {
    const matches = response.data.matches;
    if (matches) res.locals.safetyInfo = {isSafe: false, matches};
    else res.locals.safetyInfo = {isSafe: true};
    next();
  })
  .catch(error => next(error));
};

module.exports = api;
