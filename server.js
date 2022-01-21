// Import modules
const ejs = require('ejs');
const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

// API Keys
const ipstackKey = '1834644106af119462bd28f01eeac372';
const googleKey = 'AIzaSyC7QGTlwQzORmFtoGuCwjQuexQ3jHCV8us';
const vpnapikey = 'facc450fe0f24171b0ed2505289ff4fa';

const app = express();
const PORT = 3000;
app.set('view engine', 'ejs');
app.set('trust proxy', true);

const redirectLink = 'https://google.com/';

app.get('/', (req, res) => {
  res.send('Success');
})

app.get('/r', (req, res) => {
  const url = 'https://api.ipstack.com/';
  const fullPath = url.concat('173.95.50.147'); //req.headers['x-real-ip'] 173.95.50.147
  axios.get(fullPath, {
    params: { access_key: ipstackKey }
  })
  .then( ipstack => {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        latlng: `${ipstack.data.latitude},${ipstack.data.longitude}`,
        key: googleKey
      }
    })
    .then( google => {
      axios.get('https://vpnapi.io/api/173.95.50.147', {
        params: {
          key: vpnapikey
        }
      })
      .then( vpndata => {


        const bigObj = {
          timestamp: new Date().toString(),
          //ip: req.headers['x-real-ip'],
          googleData: google.data,
          ipstackData: ipstack.data,
          vpnData: vpndata.data,
          expressData: {
            ip: req.ip,
            ips: req.ips,
            headers: req.headers,
            rawHeaders: req.rawHeaders
          }
        }
        fs.writeFileSync(`./logs/log.json`, JSON.stringify(bigObj));
        res.status(200).json(bigObj);
      })
    })
  })
  .catch(err => {
    console.log(err);
  })

});

app.use((req, res) => {res.sendStatus(404)});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

