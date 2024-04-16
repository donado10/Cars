const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Car = sequelize.define(
  "cars",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    model: { type: Sequelize.STRING },
    year: { type: Sequelize.STRING },
    image: { type: Sequelize.TEXT },
    price: { type: Sequelize.FLOAT },
    description: { type: Sequelize.TEXT },
  },
  { tableName: "cars" }
);

module.exports = Car;
