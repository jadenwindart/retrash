const Sequelize = require('sequelize');

db = {}

const sequelize = new Sequelize('retrash', 'postgres', 'postgres', {
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