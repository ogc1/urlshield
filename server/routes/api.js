const express = require('express');
const { v4: uuidv4 } = require('uuid');

const db = require('../models/dbModel');
const helper = require('../controllers/helper');
const apiController = require('../controllers/apiController');
const urlController = require('../controllers/urlController');

const router = express.Router();

router.get('/logs/basic/:link', urlController.getLogs);

router.get('/logs/extended/:link', urlController.getExtendedLogs);

router.get('/logs/clicks/:link', (req, res, next) => {
  const short_url = req.params.link;
  db.query(`SELECT count(*) as clicks
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
    if (!result.rows.length) res.status(400).send('Bad request');
    else res.status(200).json(result.rows[0].clicks);
  })
  .catch(err => next(err));
})

router.get('/logs/unique/:link', (req, res, next) => {
    const short_url = req.params.link;
    db.query(`SELECT count(distinct c.visitor_id) as clicks
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
    if (!result.rows.length) res.status(400).send('Bad request');
    else res.status(200).json(result.rows[0].clicks);
  })
  .catch(err => next(err));
})

router.post('/logs/:link', (req, res, next) => {
    res.status(200).send('received')
    next();
  },
  apiController.getLogInfo, urlController.updateBasicLogs, urlController.updateNetworkLogs, 
  urlController.updateLocationLogs, urlController.updateClientLogs);

router.post('/create', urlController.createLink);

router.get('/startSession', (req, res, next) => {
  if (!req.cookies.sessionId) res.cookie('sessionId', uuidv4(), { httpOnly: true , maxAge: 31536000000});
  res.status(200).send('session active');
})



router.get('/myLinks', (req, res, next) => {

  const sessionId = req.cookies.sessionId;

  db.query(`select * from url_map where session_id = $1 order by created_on desc;`, [sessionId])
  .then(response => res.status(200).json(response.rows))
  .catch(e => next(e));

  

})

module.exports = router;