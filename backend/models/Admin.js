const { DataTypes } = require("sequelize");
const sequalize = require("../config/db");

const Admin = sequalize.define("Admin", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes,
  },
});
