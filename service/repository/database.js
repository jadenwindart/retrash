const Sequelize = require('sequelize');
require('dotenv').config();

db = {}

const sequelize = new Sequelize('retrash', process.env.POSTGRES_DB_USERNAME, process.env.POSTGRES_DB_PASSWORD, {
    host: process.env.POSTGRES_DB_HOST,
    port: process.env.POSTGRES_DB_PORT,
    dialect: 'postgres',
    "define": {
        "underscored": true
    }
}) 

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.checkConnection = async function() {
    sequelize.authenticate().catch(err => {
        console.error('Error:', err);
    });
}

module.exports = db;