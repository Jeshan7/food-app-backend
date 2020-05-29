const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoutes = require('../routes/users');
const restaurantRoutes = require('../routes/restaurants');

mongoose.connect("mongodb://localhost/app-db", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', userRoutes)
app.use('/api/restaurants', restaurantRoutes)

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error)
})

app.use((error, req, res,next) => {
    res.status(error.status || 500);
    res.json({
        Error: error.message
    })
})

module.exports = app;
