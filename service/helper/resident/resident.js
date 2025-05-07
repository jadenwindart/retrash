const _ = require('lodash')
const { v4 } = require('uuid');
const { Op } = require('sequelize');
const {Resident} = require('../../repository/model/resident')
const paginationUtil = require('../util/pagination');
const phoneNumberUtil = require('../util/phonenumber');

module.exports.GetAllResident = async () => {
    return  Resident.findAll();
}

module.exports.CreateResident = async (residentInfo) => {
    sanitizedPhoneNumber = phoneNumberUtil.sanitizeIndonesiPhoneNumber(residentInfo.phoneNumber)
    return Resident.create({
        ...residentInfo,
        id: v4(),
        phoneNumber: sanitizedPhoneNumber,
    })
}

module.exports.GetResidentList = async ({filter={},sort=[],limit,page}) => {
    pagination = paginationUtil.Paginate({limit,page})

    whereClause = _.forEach(filter, (v,k) => {
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

module.exports.GetResidentByPhoneNumber = async (phoneNumber) => {
    return Resident.findOne({ where: {phoneNumber}})
}