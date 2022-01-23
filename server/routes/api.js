const express = require('express');

const helper = require('../controllers/helper');
const apiController = require('../controllers/apiController');
const urlController = require('../controllers/urlController');

const router = express.Router();

router.get('/logs/basic/:link', urlController.getLogs);

router.get('/logs/extended/:link', urlController.getExtendedLogs);

router.post('/logs/:link', helper.acknowledgeReceipt,
  apiController.vpnApi, apiController.callIpStack, urlController.updateBasicLogs, urlController.updateNetworkLogs,
  apiController.reverseGeocode, urlController.updateLocationLogs, urlController.updateClientLogs);

router.get('/get/sessionId', (req, res, next) => {
  res.json({sessionId: req.cookies.sessionId});
});

router.post('/create', urlController.createLink);

module.exports = router;