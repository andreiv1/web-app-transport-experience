const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize')

const Line = sequelize.define('Line',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        vehicleType: {
            type: DataTypes.TINYINT(1),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startStopId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        endStopId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });


module.exports = Line;

