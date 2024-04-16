const express = require("express");
const http = require("http");
const multer = require("multer");
const path = require("path");

const carsRoutes = require("./routes/Cars");
const collectionsRoutes = require("./routes/Collections");
const authRoutes = require("./routes/Auth");

const User = require("./models/Users");

const sequelize = require("./utils/database");
const databaseRelationships = require("./utils/database-relationships");
const isDatabaseRunning = require("./middleware/isDatabaseRunning");

const app = express();
const server = http.createServer(app);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const date = new Date().getTime();
    const fileName = date + "-" + file.originalname;
    cb(null, fileName.replace(/\s/g, ""));
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(express.json({ limit: "50mb" }));

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(express.urlencoded({ limit: "50mb" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  next();
});

app.use("/auth", isDatabaseRunning, authRoutes);
app.use("/cars", isDatabaseRunning, carsRoutes);
app.use("/collections", isDatabaseRunning, collectionsRoutes);

databaseRelationships();
sequelize
  .sync({})
  .then(() => {
    server.listen(4000);
  })
  .catch((err) => {
    server.listen(4000);
  });
