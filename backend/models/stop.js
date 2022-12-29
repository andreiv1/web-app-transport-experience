const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize')

const Stop = sequelize.define('Stop', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        defaultScope: {
            attributes: { exclude: ["createdAt", "updatedAt"] },
        }
    }
);

module.exports = Stop;