const express = require('express')
const authRouter = require('./handler/auth')
const officerRouter = require('./handler/officer')
const residentRouter = require('./handler/resident')
const middleware = require("./handler/middleware")
require('dotenv').config();
const app = express()
const port = process.env.APP_PORT

app.get('/health', (req, res) => {
  res.send('OK')
})

app.use(express.json());

// auth router
app.use('/v1/auth', authRouter)

// officer router
app.use('/v1/officers', middleware.validateToken, officerRouter)
// resident router
app.use('/v1/residents', middleware.validateToken, residentRouter)


app.listen(port, () => {
  console.log(`Server app listening on port ${port}`)
})