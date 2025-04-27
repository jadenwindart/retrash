const cron = require('node-cron');
require('dotenv').config();
const express = require('express')
const monthlyInvoiceWorker = require('./worker/monthly-invoice')
const db = require('../../repository/database')

const app = express()
const port = 3000

const main = async () => {
    // check DB connection
    await db.checkConnection()

    cron.schedule("0 0 5 * *", async function () {
        try{
        await monthlyInvoiceWorker()
        }catch(err) {
            console.log(err)
        }
    });

    if (process.env.NODE_ENV == 'dev' || process.env.NODE_ENV == 'stg') {
        app.get('/cron/task/monthly-invoice', async (req, res) => {
            try {
                res.send(await monthlyInvoiceWorker())
            } catch(err) {
                console.log(err)
            }
        })
        
        app.listen(port, () => {
            console.log(`cron app debug listening on port ${port}`)
        })
    }
}

main();