const express = require("express");

const carsController = require("../controllers/Cars");
const isAuth = require("../middleware/is-Auth");

const { body } = require("express-validator");

const router = express.Router();

router.get("", carsController.getCars);
router.get("/view/:car_id", carsController.getOneCar);
router.get(
  "/view/collection/:collection_name",
  carsController.getCollectionCars
);

router.post(
  "/addCar",
  isAuth,
  [
    body("brand", "This brand name doesn't exist !").isLength({ min: 1 }),
    body("model", "The model name is incorrect").isLength({ min: 1 }),
    body("year", "The year is incorrect").isNumeric(),
    body("price", "The price is incorrect").isNumeric(),
    body(
      "description",
      "There is an error in the description. Ensure that the length is less than 100 and the characters are alphanumeric"
    ).isLength({ min: 1, max: 100 }),
  ],
  carsController.postCar
);

router.put(
  "/updateCar/:car_id",
  isAuth,
  [
    body("brand", "This brand name doesn't exist !").isLength({ min: 1 }),
    body("model", "The model name is incorrect").isLength({ min: 1 }),
    body("year", "The year is incorrect").isNumeric(),
    body("price", "The price is incorrect").isNumeric(),
    body(
      "description",
      "There is an error in the description. Ensure that the length is less than 100 and the characters are alphanumeric"
    ).isLength({ min: 1, max: 100 }),
  ],
  carsController.updateCar
);

router.delete(
  "/deleteCar",
  isAuth,
  [body("model_id", "This model doesn't exist !").isNumeric()],
  carsController.deleteCar
);

module.exports = router;
