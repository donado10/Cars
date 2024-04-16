/* const User = require("../models/Users");

User.create({
  id: 1,
  mail: "ado@test.com",
  user_password: "ado",
}).then((result) => {
  console.log(result);
});
 */

const Collection = require("../models/Collections");
const Car = require("../models/Cars");
const databaseRelation = require("../utils/database-relationships");

databaseRelation();

Car.findAll({
  raw: true,
  include: {
    model: Collection,
    attributes: ["logo"],
  },
})
  .then((car) => {
    console.log(car);
  })
  .catch((err) => {
    console.log(err);
  });

/* const fs = require("fs");

const deleteFile = (filename) => {
  fs.unlink(filename, (err) => {
    console.log(filename);
    console.log(`File ${filename} deleted successfully`);
    return true;
  });
};

deleteFile("images\\1708283809952-mercedes.png"); */
