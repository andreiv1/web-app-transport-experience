const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Experience = sequelize.define("Experience", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  departureStopId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  arrivalStopId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  departure: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  tripDuration: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  crowdedness: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
  },
  observations: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  satisfactionLevel: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lineId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Experience;