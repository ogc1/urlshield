const db = require('../models/dbModel');
const helper = require('./helper');

const dbController = {};

dbController.getUrl = (req, res, next) => {
  db.query('SELECT * FROM url_map WHERE short_url = $1;', ['htgdtf'])
    .then(result => {
      if (!result.rows.length) {
        console.log('No such link');
      } else {
        console.log(result.rows[0].destination_url);
      }
    })
    .catch(err => console.log(err));
};


dbController.createLink = (req, res, next) => {

  const short_url = helper.generateRandomUrl();

  db.query('INSERT INTO url_map (short_url, destination_url, created_ip) VALUES ($1, $2, $3);', [short_url, 'https://wikipedia.org', '173.95.50.147'])
    .then(result => {
      console.log(short_url);
    })
    .catch(err => console.log(err));
};

dbController.updateLogs = (req, res, next) => {

};

dbController.getLogsForUrl = (req, res, next) => {
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

dbController.getLogsForUser = (req, res, next) => {

};

dbController.addUser = (req, res, next) => {


};

module.exports = dbController;
