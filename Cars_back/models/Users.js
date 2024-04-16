const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    mail: {
      type: Sequelize.STRING,
    },
    user_password: {
      type: Sequelize.TEXT,
    },
  },
  {
    tableName: "users",
  }
);

module.exports = User;
