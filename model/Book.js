const sequelize = require("../utils/db");
const { DataTypes } = require("sequelize");

const Books = sequelize.define("Books", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  year_release: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },

});

module.exports = Books

