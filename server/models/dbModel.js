const { Pool } = require('pg');

const PG_URI = 'postgresql://admin:dcTKfdIWc5vniGaV@db-postgresql-nyc1-70936-do-user-10576934-0.b.db.ondigitalocean.com:25061/urlguard_pool1'//?sslmode=require';

// For private VPC connection use:
// 'postgresql://admin:dcTKfdIWc5vniGaV@private-db-postgresql-nyc1-70936-do-user-10576934-0.b.db.ondigitalocean.com:25061/urlguard_pool1'


const pool = new Pool({
  connectionString: PG_URI,
  ssl: { rejectUnauthorized: false }
});


module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};