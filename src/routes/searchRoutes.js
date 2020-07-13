const express = require("express");
const router = express.Router();
const SearchController = require("../controllers/searchControllers");

router.post("/suggestions", SearchController.fetch_suggestions);

router.post("/filter", SearchController.filter_restaurants);

router.post("/", SearchController.fetch_restaurants);

// router.get("/search", RestaurantController.search_restaurants);

module.exports = router;
