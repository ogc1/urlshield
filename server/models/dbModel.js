const { Pool } = require('pg');

const PG_URI = 'postgresql://admin:dcTKfdIWc5vniGaV@db-postgresql-nyc1-70936-do-user-10576934-0.b.db.ondigitalocean.com:25061/urlguard_pool1'//?sslmode=require';

// For private VPC connection use:
// 'postgresql://admin:dcTKfdIWc5vniGaV@private-db-postgresql-nyc1-70936-do-user-10576934-0.b.db.ondigitalocean.com:25061/urlguard_pool1'

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
  ssl: { rejectUnauthorized: false }
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