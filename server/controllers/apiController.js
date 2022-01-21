const axios = require('axios');
const dbController = require('./dbController');

const ipstackKey = '1834644106af119462bd28f01eeac372';
const googleKey = 'AIzaSyC7QGTlwQzORmFtoGuCwjQuexQ3jHCV8us';
const vpnapikey = 'facc450fe0f24171b0ed2505289ff4fa';

//         const location_info = {
//           country_code: ipstack.data.country_code,
//           country_name: ipstack.data.country_name,
//           country_flag: ipstack.data.location.country_flag,
//           region_code: ipstack.data.region_code,
//           region_name: ipstack.data.region_name,
//           city: ipstack.data.city,
//           zip: ipstack.data.zip,
//           latitude: ipstack.data.latitude,
//           longitude: ipstack.data.longitude,
//           formatted_address: google.data.results[0].formatted_address,
//         };

//         const client_info = {
//           useragent: req.headers['user-agent']
//         };

//         const network_info = {  
//           ip: ipstack.data.ip,
//           ip_type: ipstack.data.type,
//           vpn: vpndata.data.security.vpn,
//           proxy: vpndata.data.security.proxy,
//           tor: vpndata.data.security.tor,
//           relay: vpndata.data.security.relay,
//           isp: ipstack.data.connection.isp,
//           asn: ipstack.data.connection.asn
//         };

const api = {};

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

  const url1 = 'https://www.bceaoci.com';
  const url2 = 'https://wikipedia.org';

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
        {"url": url1 }
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
  })
  .catch(function (error) {
    console.log(error);
  });
  
};

module.exports = api;