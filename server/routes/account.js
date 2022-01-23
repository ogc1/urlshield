const express = require('express');

const helper = require('../controllers/helper');
const apiController = require('../controllers/apiController');
const urlController = require('../controllers/urlController');
const db = require('../models/dbModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = express.Router();

// login route
router.post('/login', (req, res, next) => {
  const sessionId = req.body.sessionId;
  const pwd = req.body.password;
  const username = req.body.username;

  db.query('SELECT _id, user_pwd from accounts where user_email = $1 or username = $1', [username])
  .then(dbResult => {
    if (dbResult.rows.length) {
      const hash = dbResult.rows[0].user_pwd;
      bcrypt.compare(pwd, hash).then(result => {
        if (result) {
          db.query('insert into session_logs (session_id, account_id) values ($1, $2)',
            [sessionId, dbResult.rows[0]._id])
            .then(() => res.status(200).send('success'))
        } 
      })
    }
  })
  .catch(err => res.status(400).send('error logging in'));
  
})

// logout route
router.post('/logout', (req, res, next) => {
  const sessionId = req.body.sessionId;
  res.clearCookie('sessionId', { httpOnly: true , maxAge: 31536000000});
  db.query('UPDATE session_logs SET is_active = false WHERE session_id = $1;', [sessionId])
  .then(() => res.status('200').send('logged out'))
  .catch(err => next(err));
})


// sign up route

router.post('/signup', (req, res, next) => {

  const username = req.body.username;
  const email = req.body.email;
  const pwd = req.body.password;

  bcrypt.hash(pwd, saltRounds).then(hash => {
    db.query(`
    INSERT INTO accounts (username, user_email, user_pwd)
    VALUES ($1, $2, $3)
    RETURNING  _id;
    `, [username, email, hash])
    .then(result => {
      db.query(` INSERT INTO session_logs (session_id, account_id) VALUES ($1, $2)`, 
        [req.body.sessionId, result.rows[0]._id])
      .then(() => res.status(201).send('account created'))
      .catch(err => next(err));
    })
    .catch(err => res.status(400).send('Username or email already exists'));
  })
  .catch(err => next(err));

  

});

// authorize route for logs

module.exports = router;