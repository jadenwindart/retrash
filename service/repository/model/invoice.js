const db = require('../database');
const { DataTypes} = require("sequelize")
const {Transaction} = require("./transaction")
const {Resident} = require("./resident");

module.exports.Invoice = db.sequelize.define(
    'invoices',
    {
        'id': {
            primaryKey: true,
            type: DataTypes.UUIDV4,
            allowNull: false,
        },
        'amount': {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        'invoice_date': {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        'last_sent_at': {
            type: DataTypes.DATE,
            allowNull: true,
        },
        'status': {
            type: DataTypes.STRING,
            allowNull: false,
        },
        'resident_id': {
            type: DataTypes.UUIDV4,
            allowNull: false,
        }
    }
)

module.exports.Invoice.hasOne(Transaction)