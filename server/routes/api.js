const express = require('express');

const apiController = require('../controllers/apiController');

const router = express.Router();

router.get('/logs/:link');

router.post('/logs/:link', apiController.callIpStack, apiController.vpnApi, apiController.reverseGeocode);

router.post('/create');


module.exports = router;