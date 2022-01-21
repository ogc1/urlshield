const db = require('../models/dbModel');
const helper = require('./helper');

const urlController = {};

urlController.getUrlInfo = (req, res, next) => {
  db.query('SELECT * FROM url_map WHERE short_url = $1;', [req.params.link])
    .then(result => {
      if (!result.rows.length) {
        res.locals.urlInfo = undefined;
        return next();
      } else {
        res.locals.urlInfo = {
          destination_url: result.rows[0].destination_url,
          url_id: result.rows[0]._id,
          short_url: result.rows[0].short_url,
          created_on: result.rows[0].created_on,
          created_ip: result.rows[0].created_ip
        }
        return next();
      }
    })
    .catch(err => console.log(err));
};

urlController.createLink = (req, res, next) => {
  const destination = 'https://wikipedia.org';
  const ip = '173.95.50.147';
  const short_url = helper.generateRandomUrl();

  db.query('INSERT INTO url_map (short_url, destination_url, created_ip) VALUES ($1, $2, $3);', [short_url, destination, ip])
    .then(result => {
      res.locals.newUrl = {
        short_url: short_url,
        destination_url: destination,
        ip: ip
      };
      return next();
    })
    .catch(err => {
      res.locals.newUrl = undefined;
      console.log(err);
      return next();
    });
};

urlController.updateBasicLogs = (req, res, next) => {
  //res.locals.url_id
  const url_id = 1;
  const ip_address = '173.95.50.146';
  //if (!url_id) return next();

  db.query('INSERT INTO basic_logs (url_id, ip_address) VALUES ($1, $2);', [url_id, ip_address])
    .then(result => {
      console.log('inserted')
      return next();
    })
    .catch(err => console.log(err));

};

urlController.updateClientLogs = (req, res, next) => {


};

urlController.updateNetworkLogs = (req, res, next) => {


};

urlController.updateLocationLogs = (req, res, next) => {


};

urlController.getLogsById = (req, res, next) => {
  db.query(`SELECT u._id, u.short_url, u.destination_url, l._id as "log_id", l.log_timestamp, l.ip_address
  FROM url_map u INNER JOIN basic_logs l ON u._id = l.url_id WHERE u.short_url = $1;`, ['htgdtf'])
  .then(result => {
    if (!result.rows.length) {
      console.log('No such link');
    } else {
      console.log(result.rows);
    }
  })
  .catch(err => console.log(err));
};





module.exports = urlController;