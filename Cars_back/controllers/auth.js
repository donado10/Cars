const { validationResult } = require("express-validator");
const crypto = require("crypto");
const { send } = require("process");
const jwt = require("jsonwebtoken");

exports.postSignUp = (req, res, next) => {
  const User = require("../models/Users");
  const results = validationResult(req);

  const mail = req.body.mail;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (password !== confirmPassword) {
    return res.status(401).json({
      status: 401,
      message: "The passwords don't match !!",
    });
  }
  if (!results.isEmpty()) {
    const error = results.errors[0];

    return res.status(401).json({
      status: 401,
      message: error.msg,
    });
  }

  User.findAll({ where: { mail: mail } })
    .then((users) => {
      if (users.length) {
        throw new Error(
          "There is someone with this email. Try with other mail !!"
        );
      }
      const user_id = crypto.randomBytes(16).toString("hex");
      User.create({
        id: user_id,
        mail: mail,
        user_password: password,
      }).then(() => {
        return res.status(200).json({
          status: 200,
          message: "User created !!",
        });
      });
    })
    .catch((err) => {
      return res.status(401).json({
        status: 401,
        message: err.message,
      });
    });
};
exports.postSignIn = (req, res, next) => {
  const User = require("../models/Users");
  const results = validationResult(req);

  const mail = req.body.mail;
  const password = req.body.password;

  if (!results.isEmpty()) {
    const error = results.errors[0];

    return res.status(401).send({ status: 401, message: error.msg });
  }

  User.findAll({
    where: {
      mail: mail,
      user_password: password,
    },
  })
    .then((user) => {
      if (!user.length) {
        throw new Error("The password is incorrect");
      }

      const payload = {
        id: user[0].id,
        mail: user[0].mail,
      };

      const secretKey = "DonAdoCorleone";
      const date = new Date().getTime();
      const expiresInMs = 3600;
      const options = { expiresIn: expiresInMs };

      const token = jwt.sign(payload, secretKey, options);

      return res.status(200).send({
        status: 200,
        token: token,
        userId: user[0].id,
        expires: date + expiresInMs * 1000,
      });
    })
    .catch((err) => {
      return res.status(401).send({
        status: 401,
        message: err.message,
      });
    });
};
