require('dotenv').config();
const express = require('express')
const authRouter = require('./handler/auth')
const officerRouter = require('./handler/officer')
const residentRouter = require('./handler/resident')
const issueReportRouter = require('./handler/issue_report')
const officerHelper = require('../../helper/officer/officer');
const middleware = require("./handler/middleware")
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
// issue report router
app.use('/v1/issue-reports', middleware.validateToken, issueReportRouter)

app.listen(port, async() => {
  // default user
  admin = await officerHelper.GetByUsername("admin")

  if (!admin) {
    await officerHelper.Register({username: "admin", plainPassword: "admin"})
  }

  console.log(`Server app listening on port ${port}`)
})