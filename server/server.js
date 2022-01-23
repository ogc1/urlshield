const express = require('express');
const path = require('path');
const ejs = require('ejs');
const api = require('./controllers/apiController.js');
const urlController = require('./controllers/urlController.js');
const db = require('./models/dbModel.js');
const { v4: uuidv4 } = require('uuid');
const apiRouter = require('./routes/api');
const accountRouter = require('./routes/account');
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

app.use(express.static(path.resolve(__dirname, '../client/static')));

/**
 * define route handlers
 */
app.use('/api', apiRouter);
app.use('/account', accountRouter);

app.get('/', (req, res, next) => {
  if (!req.cookies.sessionId) res.cookie('sessionId', uuidv4(), { httpOnly: true , maxAge: 31536000000});
  res.render('index');
});

app.get('/:link', urlController.getUrlInfo, api.verifySafety, (req, res, next) => {
  if (res.locals.safetyInfo) res.render('unsafe', {safetyInfo: res.locals.safetyInfo});
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
