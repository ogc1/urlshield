const db = require('../models/dbModel');
const helper = require('./helper');

const urlController = {};

urlController.getUrlInfo = (req, res, next) => {
  db.query('SELECT * FROM url_map WHERE short_url = $1;', [req.params.link])
    .then(result => {
      if (!result.rows.length) res.status(404).send('URL not found in database');
      else {
        res.locals.urlInfo = {
          ...result.rows[0],
          url_id: result.rows[0]._id,
        }
        next();
      }
    })
    .catch(err => next(err));
};

urlController.createLink = (req, res, next) => {
  const destination = helper.sanitizeInput(req.body.destination);
  const ip = req.body.ip;
  const sessionId = req.cookies.sessionId;
  const expiration = req.body.expiration;
  const short_url = helper.generateRandomUrl();

  db.query('INSERT INTO url_map (short_url, destination_url, created_ip, session_id, expiration) VALUES ($1, $2, $3, $4, $5) RETURNING _id;', [short_url, destination, ip, sessionId, expiration])
    .then((response) => {
      const info = {
        id: response.rows[0]._id,
        short_url: short_url,
        destination_url: destination,
        ip: ip
      };
      res.status(201).json(info);
    })
    .catch(err => next(err));
};

urlController.updateBasicLogs = (req, res, next) => {
  const url_id = req.body.url_id;
  const ip_address = req.body.ip;

  db.query('INSERT INTO basic_logs (url_id, ip_address) VALUES ($1, $2) RETURNING _id;', [url_id, ip_address])
    .then(result => {
      res.locals.log_id = result.rows[0]._id;
      console.log('inserted basic logs');
      next();
    })
    .catch(err => console.log(err));

};

urlController.updateClientLogs = (req, res, next) => {

  const url_id = req.body.url_id;
  const log_id = res.locals.log_id;
  const visitor_id = req.body.visitorId;
  const visitor_found = req.body.visitorFound;  
  const browser_name = req.body.browserName;  
  const browser_version = req.body.browserVersion;  
  const device = req.body.device;  
  const incognito = req.body.incognito;  
  const os = req.body.os;  
  const osversion = req.body.osVersion;  
  const language_id = req.body.language;  
  const languages_str = req.body.languages;  
  const useragent = req.body.userAgent;  
  const vendor = req.body.vendor;  
  const platform = req.body.platform;  
  const mobile = req.body.mobile;  
  const screen_height = req.body.screenHeight;  
  const screen_width = req.body.screenWidth;  
  const pixel_depth = req.body.pixelDepth;  
  const color_depth = req.body.colorDepth;  
  const pixel_ratio = req.body.devicePixelRatio;  
  const device_mem = req.body.deviceMemory;  
  const hardware_concurrency = req.body.hardwareConcurrency;  

  db.query(`INSERT INTO client_logs 
            (url_id, log_id, visitor_id, visitor_found, browser_name, browser_version, device, incognito, os, osversion, language_id, languages_str, useragent, vendor, platform, mobile, screen_height, screen_width, pixel_depth, color_depth, pixel_ratio, device_mem, hardware_concurrency) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23);`, 
          [url_id, log_id, visitor_id, visitor_found, browser_name, browser_version, device, incognito, os, osversion, language_id, languages_str, useragent, vendor, platform, mobile, screen_height, screen_width, pixel_depth, color_depth, pixel_ratio, device_mem, hardware_concurrency])
    .then(() => {
      console.log('inserted client logs')
    })
    .catch(err => console.log(err));

};

urlController.updateNetworkLogs = (req, res, next) => {

  const url_id = req.body.url_id;
  const log_id = res.locals.log_id;
  const ip_address = req.body.ip;
  const ip_type = res.locals.ipStack.type;  
  const isp = res.locals.ipStack.connection.isp;  
  const asn = res.locals.ipStack.connection.asn;  
  const vpn = res.locals.vpnApi.vpn;  
  const proxy = res.locals.vpnApi.proxy;
  const tor = res.locals.vpnApi.tor;       
  const relay = res.locals.vpnApi.relay;

  db.query(`INSERT INTO network_logs 
            (url_id, log_id, ip_address, ip_type, isp, asn, vpn, proxy, tor, relay) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`, 
          [url_id, log_id, ip_address, ip_type, isp, asn, vpn, proxy, tor, relay])
    .then(() => {
      console.log('inserted network logs')
      next();
    })
    .catch(err => console.log(err));

};

urlController.updateLocationLogs = (req, res, next) => {

  const url_id = req.body.url_id;
  const log_id = res.locals.log_id;
  const timezone = res.locals.ipStack.time_zone.id;
  const country_name = res.locals.ipStack.country_name;  
  const country_code = res.locals.ipStack.country_code;  
  const country_flag_emoji = res.locals.ipStack.location.country_flag;  
  const region_code = res.locals.ipStack.region_code;  
  const region_name = res.locals.ipStack.region_name;
  const city = res.locals.ipStack.city;       
  const zip = res.locals.ipStack.zip;
  const latitude = res.locals.ipStack.latitude;
  const longitude = res.locals.ipStack.longitude;       
  const formatted_address = res.locals.formatted_address;

  db.query(`INSERT INTO location_logs 
            (url_id, log_id, timezone, country_name, country_code, country_flag_emoji, region_code, region_name, city, zip, latitude, longitude, formatted_address) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`, 
          [url_id, log_id, timezone, country_name, country_code, country_flag_emoji, region_code, region_name, city, zip, latitude, longitude, formatted_address])
    .then(() => {
      console.log('inserted location logs')
      next();
    })
    .catch(err => console.log(err));

};

urlController.getLogs = (req, res, next) => {
  const short_url = req.params.link;
  db.query(`SELECT u._id, u.short_url, u.destination_url, l._id as "log_id", l.log_timestamp, l.ip_address
  FROM url_map u INNER JOIN basic_logs l ON u._id = l.url_id WHERE u.short_url = $1;`, [short_url])
  .then(result => {
    if (!result.rows.length) res.status(400).send('Bad request');
    else  res.status(200).json(result.rows);
  })
  .catch(err => next(err));
};

urlController.getExtendedLogs = (req, res, next) => {
  const short_url = req.params.link;
  db.query(`SELECT *
  FROM url_map u
  INNER JOIN basic_logs l
  ON u._id = l.url_id
  INNER JOIN network_logs n
  ON l._id = n.log_id
  INNER JOIN location_logs geo
  ON l._id = geo.log_id
  INNER JOIN client_logs c
  ON l._id = c.log_id
  WHERE u.short_url = $1;`, [short_url])
  .then(result => {
    // if (!result.rows.length) res.status(400).send('Bad request');
    res.status(200).json(result.rows);
  })
  .catch(err => next(err));
};

module.exports = urlController;