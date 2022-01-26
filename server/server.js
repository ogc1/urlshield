const express = require('express');
const path = require('path');
const ejs = require('ejs');
const api = require('./controllers/apiController.js');
const urlController = require('./controllers/urlController.js');
const { v4: uuidv4 } = require('uuid');
const apiRouter = require('./routes/api');

const cookieParser = require('cookie-parser');

const app = express();

const PORT = 3000;

/**
 * configure server
 */
app.use(express.json());
app.set('view engine', 'ejs');
app.set('trust proxy', true);
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../build')));

/**
 * define route handlers
 */
app.use('/api', apiRouter);


app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.get('/:link', urlController.getUrlInfo, api.verifySafety, (req, res, next) => {
  if (!res.locals.safetyInfo.isSafe) res.render('unsafe', {safetyInfo: res.locals.safetyInfo.matches});
  else res.render('redirect', {urlInfo: res.locals.urlInfo});
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
  console.log('***** Internal Server Error *****')
  console.log(err);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`); });

module.exports = app;
