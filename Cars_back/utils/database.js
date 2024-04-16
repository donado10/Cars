const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize({
  dialect: "mysql",
  database: "CarCollectionsAPI",
  host: "localhost",
  username: "root",
  password: "root",
  port: 50000,
  define: {
    timestamps: false,
  },
  query: {
    raw: true,
  },
});

module.exports = sequelize;
