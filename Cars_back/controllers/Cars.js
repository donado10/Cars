const { validationResult } = require("express-validator");
const fs = require("fs");

exports.getCars = (req, res, next) => {
  const Collection = require("../models/Collections");
  const Car = require("../models/Cars");
  Car.findAll({
    raw: true,
    include: {
      model: Collection,
      attributes: ["logo", "name"],
    },
  })
    .then((cars) => {
      return res.status(200).json({
        status: 200,
        cars: cars,
      });
    })
    .catch((err) => {
      return res.status(401).send({ status: 401, message: "No cars found !!" });
    });
};

exports.getCollectionCars = (req, res, next) => {
  const Car = require("../models/Cars");
  const Collection = require("../models/Collections");

  const brandName = req.params.collection_name;

  Collection.findOne({ where: { name: brandName } })
    .then((collection) => {
      if (!Object.keys(collection).length) {
        throw new Error("Collection not found !!");
      }
      Car.findAll({
        where: { CollectionId: collection.id },
        raw: true,
        include: {
          model: Collection,
          attributes: ["logo", "name"],
        },
      }).then((cars) => {
        return res.status(200).send({ status: 200, cars: cars });
      });
    })
    .catch((err) => {
      return res.status(404).send({ status: 404, message: err.message });
    });
};

exports.getOneCar = (req, res, next) => {
  const Collection = require("../models/Collections");
  const Car = require("../models/Cars");
  const car_id = req.params.car_id;
  Car.findOne({
    raw: true,
    include: {
      model: Collection,
      attributes: ["name"],
    },
    where: {
      id: car_id,
    },
  })
    .then((car) => {
      return res.status(200).json({
        status: 200,
        car: car,
      });
    })
    .catch((err) => {
      return res.status(500).send({ status: 500, message: "No car found !!" });
    });
};

exports.postCar = (req, res, next) => {
  const Collection = require("../models/Collections");
  const Car = require("../models/Cars");

  const brandName = req.body.brand;
  const model = req.body.model;
  const year = req.body.year;
  const price = req.body.price;
  const description = req.body.description;
  const file = req.file;
  const user = req.user;

  if (!file) {
    return res.status(400).json({
      status: 400,
      message: "Please add a pic for the model !!",
    });
  }
  const results = validationResult(req);

  if (!results.isEmpty()) {
    const error = results.errors[0];
    return res.status(400).json({
      status: 400,
      message: error.msg,
    });
  }

  Collection.findOne({ where: { name: brandName } })
    .then((collection) => {
      if (!collection) {
        throw new Error("Collection not found !!");
      }
      Car.create({
        model: model,
        year: year,
        price: price,
        description: description,
        image: file.path,
        CollectionId: collection.id,
        userId: user.id,
      })
        .then(() => {
          return res.status(200).json({
            status: 200,
            message: "The Car model has been added to the collection",
          });
        })
        .catch(() => {
          return res.status(400).json({
            status: 400,
            message: "The car hasn't be created !!",
          });
        });
    })
    .catch((err) => {
      return res.status(400).json({
        status: 400,
        message: err.message,
      });
    });
};

exports.deleteCar = [
  (req, res, next) => {
    const Car = require("../models/Cars");

    const user = req.user;
    const model_id = req.body.model_id;

    let oldFile = null;

    Car.findOne({
      where: {
        userId: user.id,
        id: model_id,
      },
    })
      .then((car) => {
        if (!car) {
          throw new Error("This car can't be deleted !!");
        }
        oldFile = car.image;
        Car.destroy({
          where: {
            userId: car.userId,
            id: car.id,
          },
        })
          .then(() => {
            if (!oldFile) {
              res.status(200).json({
                status: 200,
                message: "The car has been deleted !!",
              });
            }
            req.oldFile = oldFile;
            next();
          })
          .catch(() => {
            return res.status(400).json({
              status: 400,
              message: "This car can't be deleted !!",
            });
          });
      })
      .catch((err) => {
        return res.status(400).json({
          status: 400,
          message: "Car not found !!",
        });
      });
  },
  (req, res, next) => {
    fs.unlink(req.oldFile, (err) => {
      return res.status(200).json({
        status: 200,
        message: "The car has been deleted !!",
      });
    });
  },
];

exports.updateCar = [
  (req, res, next) => {
    const Car = require("../models/Cars");
    const Collection = require("../models/Collections");

    const car_id = req.params.car_id;
    const brandName = req.body.brand;
    const model = req.body.model;
    const year = req.body.year;
    const price = req.body.price;
    const description = req.body.description;
    const file = req.file;
    const user = req.user;

    let oldFile = null;

    const results = validationResult(req);

    if (!results.isEmpty()) {
      const error = results.errors[0];
      return res.status(400).json({
        status: 400,
        message: error.msg,
      });
    }

    Promise.all([
      Collection.findOne({
        where: { name: brandName },
      }),
      Car.findOne({ where: { id: car_id, userId: user.id } }),
    ])
      .then(([collection, car]) => {
        if (!collection) {
          throw new Error("There is no collection with this name !!");
        }

        if (!car) {
          throw new Error("Car not found !!!");
        }

        if (file) {
          oldFile = car.image;
          car.image = file.path;
        }
        Car.update(
          {
            CollectionId: collection.id,
            model: model,
            year: year,
            price: price,
            description: description,
            image: car.image,
          },
          { where: { id: car_id } }
        )
          .then(() => {
            if (!oldFile) {
              return res.status(200).json({
                status: 200,
                message: "The car has been updated",
              });
            }
            req.oldFile = oldFile;
            next();
          })
          .catch((err) => {
            return res.status(400).json({
              status: 400,
              message: "The car has not been updated!!",
            });
          });
      })
      .catch((err) => {
        return res.status(400).json({
          status: 400,
          message: err.message,
        });
      });
  },
  (req, res, next) => {
    fs.unlink(req.oldFile, (err) => {
      return res.status(200).json({
        status: 200,
        message: "The car has been deleted !!",
      });
    });
  },
];
