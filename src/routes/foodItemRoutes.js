const express = require("express");
const router = express.Router();
const FoodItemsController = require("../controllers/FoodItemsController");

router.get("/", FoodItemsController.fetch_all_fooditems);

router.post("/add", FoodItemsController.add_foodItem);
 
router.delete("/:id", FoodItemsController.delete_foodItem);

module.exports = router;
