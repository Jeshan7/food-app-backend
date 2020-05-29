const express = require("express");
const router = express.Router();
const RestaurantController = require("../controllers/RestaurantController");

router.get("/", RestaurantController.fetch_all_restaurants);

router.post("/add", RestaurantController.add_restaurant);

router.delete("/:id", RestaurantController.delete_restaurant);

module.exports = router;
