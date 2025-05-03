const {Officer} = require('../../repository/model/officer');
const bcrypt = require('bcrypt');
const { v4 } = require('uuid');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const paginationUtil = require('../util/pagination');
const { Op } = require('sequelize');

const generateToken = (payload) => {
  const secretKey = process.env.SERVICE_SECRET; // Replace with your own secret key
  const options = {
    expiresIn: '1h', // Token expiration time
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

module.exports.GetByUsername = async (username) => {
    return Officer.findOne({ where: {username: username} })
}

module.exports.Login = async ({username, plainPassword}) => {
    officer = await this.GetByUsername(username);

    isMatch = bcrypt.compareSync(plainPassword, officer.password);

    if (!isMatch) {
        throw new Error("Wrong username or password")
    }

    token = generateToken({
        id: officer.id,
        username: officer.username,
        type: officer.type
    })

    return {
        token: token
    }
}

module.exports.refreshToken = async(officer) => {
    token = generateToken({
        id: officer.id,
        username: officer.username,
        type: officer.type
    })

    return {
        token: token
    }
}

module.exports.Register = async ({username, plainPassword, type}) => {
    try {
        const hashedPassword = hashPassword(plainPassword);
        console.log(hashedPassword);
        officer = await Officer.create({
            id: v4(),
            username: username,
            password: hashedPassword,
            type: type,
        })

        return _.omit(officer.toJSON(), ['password'])
    } catch(err) {
        console.log(err)
        throw err
    }
}

const hashPassword = (password) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds)
    
    return bcrypt.hashSync(password, salt)
}

module.exports.OfficerList = async ({filter={},sort=[],limit,page}) => {
    pagination = paginationUtil.Paginate({limit,page})

    whereClause = _.map(filter, (v,k) => {
        return {
            [k]: {
                [Op.eq]: v
            }
        }
    })

    if (sort == []) {
        sort = ['createdAt', 'DESC']
    } else {
        sort = JSON.parse(sort)
    }

    console.log(sort)
    return Officer.findAll({
        attributes: { exclude: ['password'] },
        where: whereClause,
        order: sort,
        limit: pagination.limit,
        offset: pagination.offset,
    })
}

module.exports.UpdateOfficer = async(updateOfficer) => {
    existingOfficer = await Officer.findOne({ where: {id:updateOfficer.id}, attribute: { exclude: ['password']}})

    existingOfficer = _.merge(existingOfficer, updateOfficer)

    return existingOfficer.save()
}