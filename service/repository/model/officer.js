const db = require('../database');
const { DataTypes} = require("sequelize")

module.exports.Officer = db.sequelize.define(
    'officers',
    {
        id: {
            primaryKey: true,
            allowNull: false,
            type: DataTypes.UUIDV4,
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        type: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    }
)