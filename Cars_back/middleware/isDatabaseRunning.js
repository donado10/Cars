module.exports = (req, res, next) => {
  const sequelize = require("../utils/database");

  sequelize
    .authenticate()
    .then(() => {
      next();
    })
    .catch((err) => {
      return res.status(500).send({ status: 500, message: "server error !!" });
    });
};
