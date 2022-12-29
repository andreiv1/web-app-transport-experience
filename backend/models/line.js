const sequelize = require("../sequelize");
const Sequelize = require('sequelize')
const { DataTypes } = require("sequelize");

const vehicleType = Sequelize.ENUM('bus', 'trolleybus', 'tram', 'subway');

const Line = sequelize.define("Line", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  vehicleType: {
    type: vehicleType,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startStopId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  endStopId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  defaultScope: {
    attributes: { exclude: ["createdAt", "updatedAt"] },
  }
});

module.exports = { Line, vehicleType };
