const { Sequelize } = require('sequelize');
require('dotenv').config();


let seq;
switch (process.env.DB) {
    case 'sqlite':
        seq = new Sequelize({
            dialect: process.env.DB,
            storage: process.env.SQLITE_PATH
        })
        break;

    case 'mysql':
        seq = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASS,
            {
                host: process.env.DB_HOST,
                dialect: process.env.DB
            })
        break;

    default:
        throw new Error("Choose between sqlite and mysql in .env file");
}

const sequelize = seq;
sequelize.sync().then(() => {
    console.log('All models were synced successfully.')
})

module.exports = sequelize