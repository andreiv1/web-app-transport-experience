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
            type: DataTypes.INTEGER,
            allowNull: false
        },
        directionLocation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        returnLocation: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

