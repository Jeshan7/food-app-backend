const express = require("express");
const router = express.Router();
const RestaurantController = require("../controllers/RestaurantController");
const checkAuth = require("../middlewares/checkAuth");

router.get("/", RestaurantController.fetch_all_restaurants);

router.post("/add", RestaurantController.add_restaurant);

router.delete("/:id", RestaurantController.delete_restaurant);

router.post("/search", RestaurantController.fetch_restaurants);

// router.get("/search", RestaurantController.search_restaurants);

module.exports = router;
