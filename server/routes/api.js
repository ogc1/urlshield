const express = require('express');

const apiController = require('../controllers/apiController');
const dbController = require('../controllers/dbController');

const router = express.Router();

router.get('/logs/:link');

router.post('/logs/:link', api.processFrontEndData, apiController.callIpStack, 
  apiController.vpnApi, apiController.reverseGeocode, dbController.updateLogs);

router.post('/create');


module.exports = router;