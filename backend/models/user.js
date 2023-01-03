const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        // len: [6, 32],
        // is: ["/^[0-9a-z]+$", 'i']
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // len: [8, 128],
        // is: ["/^[0-9a-zA-Z]+$", 'i']
      },
    },
    email: {
      type: DataTypes.STRING(128),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    enabled: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    activationToken: {
      type: DataTypes.STRING,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
    }
  },
  {
    defaultScope: {
      attributes: { exclude: ["password", "isAdmin", "activationToken", "enabled"] },
    },
    scopes: {
      withPassword: {
        attributes: { include: ["password"] },
      },
    },
    hooks: {
      beforeCreate: async (user, options) => {
        //Sanitaze email
        user.email = user.email.toLowerCase();
        //Encrypt password
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
  }
);

module.exports = User;
