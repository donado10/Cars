const express = require("express");
const isAuth = require("../middleware/is-Auth");
const { body } = require("express-validator");

const router = express.Router();

const collectionsControllers = require("../controllers/Collections");

router.get("/", collectionsControllers.getCollections);

router.get("/view/:collection_id", collectionsControllers.getOneCollection);

router.get("/names", collectionsControllers.getCollectionsNames);

router.post(
  "/addBrand",
  isAuth,
  [
    body("brand", "The brand name is not correct !").isLength({
      min: 1,
    }),
    body(
      "description",
      "There is an error in the description. Ensure that the length is less than 100 and the characters are alphanumeric"
    ).isLength({ min: 1, max: 100 }),
  ],
  collectionsControllers.postCollections
);
router.put(
  "/updateBrand",
  isAuth,
  [
    body("brand_id", "The brand id is incorrect")
      .isNumeric()
      .isLength({ min: 1 }),
    body("brand", "The brand name is not correct !").isLength({
      min: 1,
    }),
    body(
      "description",
      "There is an error in the description. Ensure that the length is less than 100 and the characters are alphanumeric"
    ).isLength({ min: 1, max: 100 }),
  ],
  collectionsControllers.updateCollection
);

router.delete(
  "/deleteBrand",
  isAuth,
  [body("brand_id", "The brand id is incorrect").isAlphanumeric()],
  collectionsControllers.deleteCollection
);

module.exports = router;
