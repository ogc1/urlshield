const { Pool } = require('pg');


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
