const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Collection = sequelize.define(
  "collections",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    },
    logo: {
      type: Sequelize.TEXT,
    },
    description: {
      type: Sequelize.TEXT,
    },
  },
  {
    tableName: "collections",
  }
);

module.exports = Collection;
