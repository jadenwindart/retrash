const { v4 } = require('uuid');
const _ = require('lodash');
const {IssueReport} = require('../../repository/model/issue_report');
const {Officer} = require('../../repository/model/officer');
const paginationUtil = require('../util/pagination');

module.exports.createIssue = async (issue) => {
    return IssueReport.create({
        ...issue,
        id: v4(),
    })
}

module.exports.issueList = async ({filter={},sort=[],limit,page}) => {
    pagination = paginationUtil.Paginate({limit,page})
    
    whereClause = _.map(filter, (v,k) => {
        return {
            [k]: {
                [Op.eq]: v
            }
        }
    })

    if (sort.length == 0) {
        sort = [['createdAt', 'DESC']]
    } else {
        sort = JSON.parse(sort)
    }

    return IssueReport.findAll({
        where: whereClause,
        order: sort,
        limit: pagination.limit,
        offset: pagination.offset,
        include: { 
            model: Officer,
            attributes: {exclude: ['password'] }
        }
    })
}