const express = require('express')
const _ = require('lodash')
const issueReportHelper = require('../../../helper/issue_report/issue_report')
const router = express.Router()

const create = async (req, res) => {
    try {
        body = _.pick(req.body, ['description'])
        officerSession = req.officer

        issueReport = await issueReportHelper.createIssue({
            ...body,
            reportedBy: officerSession.id
        })

        res.send(issueReport)
    } catch (error) {
        console.log(error)

        res.send({error: "Terjadi kesalahan pada sistem"})
    }
}

const list = async (req, res) => {
    try {
        queryParams = req.query

        issueReports = await issueReportHelper.issueList({
            filter: JSON.parse(queryParams.filter||'{}'),
            sort:queryParams.sort,
            limit: queryParams.limit,
            page: queryParams.page
        })

        res.send(issueReports)
    } catch (error) {
        console.log(error)

        res.send({error: "Terjadi kesalahan pada sistem"})
    }
}

router.get('', list)
router.post('', create)

module.exports = router