const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.DB_PORT,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME
})

client.connect();

module.exports = client;