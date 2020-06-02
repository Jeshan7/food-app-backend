const express = require("express");
const router = express.Router();
const RestaurantController = require("../controllers/RestaurantController");
const checkAuth = require("../middlewares/checkAuth");

router.get("/", checkAuth, RestaurantController.fetch_all_restaurants);

router.post("/add", checkAuth, RestaurantController.add_restaurant);

router.delete("/:id", checkAuth, RestaurantController.delete_restaurant);

module.exports = router;
