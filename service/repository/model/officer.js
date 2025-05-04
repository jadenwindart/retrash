const db = require('../database');
const { DataTypes} = require("sequelize");
const { IssueReport } = require("./issue_report");

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

module.exports.Officer.hasMany(IssueReport)
IssueReport.belongsTo(module.exports.Officer)