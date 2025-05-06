const db = require('../database');
const { DataTypes} = require("sequelize")
const {Transaction} = require("./transaction")
const {Resident} = require("./resident");

module.exports.Invoice = db.sequelize.define(
    'invoices',
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUIDV4,
            allowNull: false,
        },
        amount: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        invoiceDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        lastSentAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        residentId: {
            type: DataTypes.UUIDV4,
            allowNull: false,
        },
        paymentLink: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }
)

module.exports.Invoice.hasOne(Transaction)