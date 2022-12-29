const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize')

const LineStop = sequelize.define('LineStop', {
    lineId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    stopId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    orderIndex: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = LineStop;