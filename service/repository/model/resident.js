const db = require('../database');
const { DataTypes} = require("sequelize");
const { Invoice } = require("./invoice");
const { Transaction } = require("./transaction");

module.exports.Resident = db.sequelize.define(
    'residents',
    {
        id: {
        primaryKey: true,
            type: DataTypes.UUIDV4,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isDelete: {
            type: DataTypes.BOOLEAN,
        }
    }
);

module.exports.Resident.hasMany(Invoice)
module.exports.Resident.hasMany(Transaction)