const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("../routes/usersRoutes");
const restaurantRoutes = require("../routes/restaurantRoutes");
const menuRoutes = require("../routes/menuRoutes");
const foodItemsRoutes = require("../routes/foodItemRoutes");
const orderRoutes = require("../routes/orderRoutes");

mongoose.connect("mongodb://localhost/app-db", { useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/fooditems", foodItemsRoutes);
app.use("/api/order", orderRoutes);

app.use((req, res, next) => {
  const error = new Error("Route not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    Error: error.message,
  });
});

module.exports = app;
