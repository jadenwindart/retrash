require('dotenv').config();
const express = require('express')
const authRouter = require('./handler/auth')
const officerRouter = require('./handler/officer')
const residentRouter = require('./handler/resident')
const issueReportRouter = require('./handler/issue_report')
const officerHelper = require('../../helper/officer/officer');
const transactionRouter = require('./handler/transaction');
const invoiceRouter = require('./handler/invoice');
const midtransRouter = require('./handler/midtrans');
const whatsappRouter = require('./handler/whatsapp');
const middleware = require("./handler/middleware")
const enumHelper = require("../../helper/enum/enum")
var cors = require('cors')
const app = express()
const port = process.env.APP_PORT

app.get('/health', (req, res) => {
  res.send('OK')
})

app.use(cors());
app.use(express.json());

// auth router
app.use('/v1/auth', authRouter)

// officer router
app.use('/v1/officers', middleware.validateToken, officerRouter)
// resident router
app.use('/v1/residents', middleware.validateToken, residentRouter)
// issue report router
app.use('/v1/issue-reports', middleware.validateToken, issueReportRouter)
// transactions router
app.use('/v1/transactions', middleware.validateToken, transactionRouter)
// invoice router
app.use('/v1/invoices', middleware.validateToken, invoiceRouter)

// midtrans notification
app.use('/midtrans', midtransRouter)
// whatsapp notification
app.use('/whatsapp', whatsappRouter)

app.listen(port, async() => {
  // default user
  admin = await officerHelper.GetByUsername("admin")

  if (!admin) {
    await officerHelper.Register({username: "admin", plainPassword: "admin", type: enumHelper.OFFICER_TYPE.ADMINISTRATOR})
  }

  console.log(`Server app listening on port ${port}`)
})