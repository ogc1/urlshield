const express = require('express');
const path = require('path');
const ejs = require('ejs');
const api = require('./controllers/apiController.js');
const db = require('./models/dbModel.js');
const apiRouter = require('./routes/api');

const app = express();
const PORT = 3000;

/**
 * handle nginx reverse proxy configuration
 */
app.set('trust proxy', true);

/**
 * handle parsing request body
 */
app.use(express.json());

/**
 * handle requests for static files
 */
app.use(express.static(path.resolve(__dirname, '../client')));

/**
 * define route handlers
 */
app.use('/api', apiRouter);


app.get('/', (req, res) => {
  // Deliver React app
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/:link', api.verifySafety, (req, res, next) => {
  res.sendFile(path.join(__dirname, 'redirect.html'));
});

/**
 * 404 handler
 */
 app.use('*', (req, res) => {
  res.status(404).send('Not Found');
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
