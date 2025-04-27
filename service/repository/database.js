const Sequelize = require('sequelize');

db = {}

const sequelize = new Sequelize('retrash', 'postgres', 'postgres', {
    host: 'localhost',
    port: 5433,
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