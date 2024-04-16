const User = require("../models/Users");
const Collection = require("../models/Collections");
const Car = require("../models/Cars");

module.exports = () => {
  User.hasMany(Collection, {
    constraints: true,
    onDelete: "CASCADE",
    foreignKey: "userId",
  });
  Collection.belongsTo(Car, {
    foreignKey: "userId",
  });

  User.hasMany(Car, {
    constraints: true,
    onDelete: "CASCADE",
    foreignKey: "userId",
  });
  Car.belongsTo(User, {
    foreignKey: "userId",
  });

  Collection.hasMany(Car, {
    constraints: true,
    onDelete: "CASCADE",
    foreignKey: "CollectionId",
  });
  Car.belongsTo(Collection, { foreignKey: "CollectionId" });
};
