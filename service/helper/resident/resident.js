const _ = require('lodash')
const { v4 } = require('uuid');
const { Op } = require('sequelize');
const {Resident} = require('../../repository/model/resident')
const paginationUtil = require('../util/pagination');

module.exports.GetAllResident = async () => {
    return  Resident.findAll();
}

module.exports.CreateResident = async (residentInfo) => {
    return Resident.create({
        ...residentInfo,
        id: v4()
    })
}

module.exports.GetResidentList = async ({filter={},sort=[],limit,page}) => {
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

    return Resident.findAll({
        where: {
            ...whereClause,
            isDelete: {
                [Op.eq]: false
            },
        },
        order: sort,
        limit: pagination.limit,
        offset: pagination.offset,
    })
}

module.exports.UpdateResident = async (updatedResident) => {
    existingResident = await Resident.findOne({ where: {id:updatedResident.id} })
    
    existingResident = _.merge(existingResident, updatedResident)

    return existingResident.save()
}