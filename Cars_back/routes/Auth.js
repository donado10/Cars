const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const authControllers = require("../controllers/auth");

router.post(
  "/sign-up",
  [
    body("mail", "The email is incorrect !!").isEmail(),
    body(
      "password",
      "The password should be greater than five characters !!"
    ).isLength({ min: 5 }),
  ],
  authControllers.postSignUp
);
router.post(
  "/sign-in",
  [body("mail", "The email is incorrect !!").isEmail()],
  authControllers.postSignIn
);

module.exports = router;
