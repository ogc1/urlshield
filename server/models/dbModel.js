const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const PG_URI = 'postgresql://admin:dcTKfdIWc5vniGaV@db-postgresql-nyc1-70936-do-user-10576934-0.b.db.ondigitalocean.com:25061/urlguard_pool1'//?sslmode=require';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync(path.join(__dirname, 'ca-certificate.crt')).toString()
  }
});

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};