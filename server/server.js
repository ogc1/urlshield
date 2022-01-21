const express = require('express');
const path = require('path');
const ejs = require('ejs');
const api = require('./controllers/apiController.js');
const urlController = require('./controllers/urlController.js');
const db = require('./models/dbModel.js');
const apiRouter = require('./routes/api');

const app = express();
const PORT = 3000;

/**
 * configure server
 */
app.use(express.json());
app.set('view engine', 'ejs');
app.set('trust proxy', true);
app.use(express.static(path.resolve(__dirname, '../client')));

/**
 * define route handlers
 */
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  // Deliver React app
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/:link', urlController.getUrlInfo, api.verifySafety, (req, res, next) => {
  if (res.locals.safetyInfo) {
    res.render('unsafe', {safetyInfo: res.locals.safetyInfo});
  } else {
    res.render('redirect', {urlInfo: res.locals.urlInfo});
  }
  
});

/**
 * 404 handler
 */

 app.use((req, res) => {
  res.status(404).send('Resource not found');
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`); });

module.exports = app;
