const express = require('express');

const apiController = require('../controllers/apiController');
const urlController = require('../controllers/urlController');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('received get request on /')
  res.send('hi');
})

router.get('/logs/:link', (req, res, next) => {
  console.log('received get request on logs');
  res.send('getting logs');
});

router.post('/logs/:link', (req, res, next) => {
  console.log('received post request on logs');
  console.log(req.body);
  res.status(201).send('posting logs');
});

router.post('/create', (req, res, next) => {
  // send back the new shortened link
});


module.exports = router;