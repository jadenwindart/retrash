const db = require('../database');
const {DataTypes} = require("sequelize");

module.exports.Transaction = db.sequelize.define(
    'transactions',
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUIDV4,
            allowNull: false,
        },
        invoiceId: {
            type: DataTypes.UUIDV4,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        paidAmount: {
            allowNull: true,
            type: DataTypes.NUMBER,
        },
        transactionTimestamp: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        residentId: {
            allowNull: false,
            type: DataTypes.UUIDV4,
        },
        isManual: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        manualOfficer: {
            type: DataTypes.UUIDV4,
            allowNull: true,
        },
    }
)