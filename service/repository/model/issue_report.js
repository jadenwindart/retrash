const db = require('../database');
const { DataTypes} = require("sequelize");
const { Officer } = require('./officer')

module.exports.IssueReport = db.sequelize.define(
    'issue_reports',
    {
        id: {
            primaryKey: true,
            allowNull: false,
            type: DataTypes.UUIDV4,
        },
        officerId: {
            allowNull: false,
            type: DataTypes.UUIDV4,
        },
        description: {
            allowNull: false,
            type: DataTypes.TEXT,
        }
    }
)