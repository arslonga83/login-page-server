const { pool } = require('./database.js')
const bcrypt = require('bcrypt')

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  // check for existing user
  const  data  =  await pool.query(`SELECT * FROM users WHERE username = $1;`, [username])
  if (data.rows.length > 0) {
    return res.status(400).send('that username already exists');
  }

  // hash the password
  const hash = await bcrypt.hash(password, 10);
  const user = {
    username, 
    password: hash
  }

  // insert new user into database
  pool.query(`INSERT INTO users (username, password) VALUES ($1, $2)`, [user.username, user.password], (error, results) => {
    if (error) {
      res.status(400).send('something went wrong')
    }
    else {
      res.status(200).send('user added to database')
    }
  })
}

module.exports = { registerUser }