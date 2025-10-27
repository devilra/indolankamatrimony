const { DataTypes } = require("sequelize");
const sequalize = require("../config/db");

const Admin = sequalize.define(
  "Admin",
  {
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
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    register_date: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    register_month: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    register_year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "admins",
  }
);

module.exports = Admin;
