const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  console.log(token);

  jwt.verify(token, "DonAdoCorleone", (err, user) => {
    if (err) {
      return res.status(401).send({
        status: 401,
        message: "The token is unrecognized !!",
      });
    }

    console.log(user);
    req.user = user;
    next();
  });
};
