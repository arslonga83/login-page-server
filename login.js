const { pool } = require('./database.js')
const bcrypt = require('bcrypt')

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // check that user exists
  const  data  =  await pool.query(`SELECT * FROM users WHERE username = $1;`, [username])
  if (data.rows.length === 0) {
    return res.status(400).send('username not found');
  }
  console.log(data.rows[0])

  // check the password
  const isValid = await bcrypt.compare(password, data.rows[0].password)
  if (!isValid) {
    return res.send('wrong password')
  }

  //return result
  res.send('login successful')
}

module.exports = { loginUser }