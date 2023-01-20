require('dotenv').config()
const Pool = require('pg').Pool;

const pool = new Pool({
  user: "rpnepsvq",
  host: process.env.DB_URL,
  database: "rpnepsvq",
  password: process.env.DB_PW,
  port: 5432
});

module.exports = { pool }