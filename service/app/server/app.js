const express = require('express')
const authRouter = require('./handler/auth')
const officerRouter = require('./handler/officer')
const middleware = require("./handler/middleware")
const app = express()
const port = 8080
require('dotenv').config();

app.get('/health', (req, res) => {
  res.send('OK')
})

app.use(express.json());

// auth router
app.use('/v1/auth', authRouter)

// officer router
app.use('/v1/officers', middleware.validateToken, officerRouter)


app.listen(port, () => {
  console.log(`Server app listening on port ${port}`)
})