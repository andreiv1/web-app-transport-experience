const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize')

const Stop = sequelize.define('Stop',  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Stop;