const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js"); // 🔗 your Sequelize connection file

const Profile = sequelize.define(
  "Profile",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mprofile: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    pname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    dob: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    pbrith: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    tbrith: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rasi: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nakshatram: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    laknam: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    maritalstatus: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    education: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    occupation: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    annualincome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    mothertongue: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    religion: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    caste: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    subcaste: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    fname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    foccupation: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    mname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    moccupation: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    sister: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    brother: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    children: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rplace: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    whatsappno: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    addressdetails: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phonenumber: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "profile", // same as your SQL table name
    timestamps: false, // since not in your SQL table
  }
);

module.exports = Profile;
