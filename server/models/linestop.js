const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize')

const LineStop = sequelize.define('LineStop',  {
    lineId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    stopId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
});

module.exports = LineStop;