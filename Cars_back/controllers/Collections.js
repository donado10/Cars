const { validationResult } = require("express-validator");

const fs = require("fs");

exports.getCollections = (req, res, next) => {
  const Collection = require("../models/Collections");

  Collection.findAll()
    .then((collections) => {
      return res.status(200).json({
        status: 200,
        Collections: collections,
      });
    })
    .catch((err) => {
      return res
        .status(401)
        .send({ status: 401, message: "No collections found !!" });
    });
};

exports.getOneCollection = (req, res, next) => {
  const Collection = require("../models/Collections");

  const collection_id = req.params.collection_id;
  Collection.findOne({
    where: {
      id: collection_id,
    },
  })
    .then((collection) => {
      return res.json({
        Collection: collection,
      });
    })
    .catch((err) => {
      return res
        .status(401)
        .send({ status: 401, message: "No collection found !!" });
    });
};

exports.getCollectionsNames = (req, res, next) => {
  const Collection = require("../models/Collections");

  Collection.findAll()
    .then((collections) => {
      const names = collections.map((collection) => {
        return collection.name;
      });
      return res.json({
        Collections_names: names,
      });
    })
    .catch((err) => {
      return res
        .status(401)
        .send({ status: 401, message: "No collections name found !!" });
    });
};

exports.postCollections = (req, res, next) => {
  const Collection = require("../models/Collections");
  const brandName = req.body.brand;
  const file = req.file;
  const description = req.body.description;
  const user = req.user;

  const results = validationResult(req);

  if (!file) {
    const error = new Error("There is no valid file. Please try again.");

    return res.status(400).json({
      status: 401,
      message: error.message,
    });
  }

  if (!results.isEmpty()) {
    const error = results.errors[0];
    return res.status(400).json({
      status: 400,
      message: error.msg,
    });
  }

  Collection.findAll({ where: { name: brandName } })
    .then((collection) => {
      if (collection.length) {
        throw new Error("There is already a collection with this name !!");
      }
      Collection.create({
        name: brandName,
        logo: file.path,
        description: description,
        userId: user.id,
      }).then(() => {
        return res.status(200).json({
          status: 200,
          message: "All right !!",
        });
      });
    })
    .catch((err) => {
      return res.status(401).send({
        status: 401,
        message: err.message,
      });
    });
};

exports.deleteCollection = [
  (req, res, next) => {
    const Collection = require("../models/Collections");

    const brand_id = req.body.brand_id;
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

    Collection.findOne({
      where: {
        id: brand_id,
        userId: user.id,
      },
    })
      .then((collection) => {
        if (!collection) {
          throw new Error("Collection not found");
        }
        oldFile = collection.logo;
        Collection.destroy({
          where: {
            id: collection.id,
            userId: collection.userId,
          },
        })
          .then(() => {
            req.oldFile = oldFile;
            next();
          })
          .catch((err) => {
            return res.status(400).json({
              status: 400,
              message: "Collection not found",
            });
          });
      })
      .catch((err) => {
        return res.status(401).json({
          status: 401,
          message: err.message,
        });
      });
  },
  (req, res, next) => {
    fs.unlink(req.oldFile, (err) => {
      console.log(`File ${req.oldFile} deleted successfully`);
      return res.status(200).json({
        status: 200,
        message: "The Collection has been deleted !!",
      });
    });
  },
];

exports.updateCollection = [
  (req, res, next) => {
    const Collection = require("../models/Collections");

    const brand_id = req.body.brand_id;
    const brandName = req.body.brand;
    const file = req.file;
    const description = req.body.description;
    const user = req.user;

    let oldFile = null;
    const results = validationResult(req);

    if (!results.isEmpty()) {
      const error = results.errors[0];

      return res.status(500).json({
        status: 500,
        message: error.msg,
      });
    }

    Promise.all([
      Collection.findAll({
        where: {
          name: brandName,
        },
      }),
      Collection.findOne({
        where: {
          id: brand_id,
          userId: user.id,
        },
      }),
    ])
      .then(([collections, collection]) => {
        if (!collection) {
          throw new Error("Collection not found");
        }
        collection.brand = brandName;
        if (file) {
          oldFile = collection.logo.toString();
          collection.logo = file.path;
        }
        collection.description = description;
        Collection.update(
          { ...collection },
          {
            where: {
              id: brand_id,
            },
          }
        )
          .then(() => {
            if (oldFile) {
              req.oldFile = oldFile;
              return next();
            }
            return res.status(200).json({
              status: 200,
              message: "The collection has been updated",
            });
          })
          .catch((err) => {
            return res.status(400).json({
              message: err.message,
            });
          });
      })
      .catch((err) => {
        return res.status(401).json({
          status: 401,
          message: err.message,
        });
      });
  },

  (req, res, next) => {
    fs.unlink(req.oldFile, (err) => {
      return res.status(200).json({
        status: 200,
        message: "The Collection has been updated !!",
      });
    });
  },
];
