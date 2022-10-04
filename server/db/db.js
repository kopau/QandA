const { Pool } = require('pg');
require('dotenv').config();

// const pool = new Pool({
//   host: process.env.HOST,
//   user: process.env.USER,
//   port: process.env.DB_PORT,
//   password: process.env.PASSWORD,
//   database: process.env.DB_NAME
// })

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  port: process.env.DB_PORT,
  password: process.env.PGPASSWORD,
  database: process.env.DB_NAME
})


pool.connect();

module.exports = pool;