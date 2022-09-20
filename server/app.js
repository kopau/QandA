require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const db = require('./db/db.js');
const router = require('./routes.js')

const PORT = process.env.PORT || 8080;
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/qa', router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});