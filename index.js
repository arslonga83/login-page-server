const express = require('express')
const { registerUser } = require('./register')
const { loginUser } = require('./login')
const port = process.env.PORT || 3000

const app = express()
app.use(express.json())


app.listen(port, () => console.log(`listening on port ${port}`))

app.post('/register', registerUser)
app.post('/login', loginUser)