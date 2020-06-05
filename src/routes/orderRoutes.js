const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");

router.get("/", OrderController.fetch_all_orders);

router.post("/", OrderController.add_order); // restaurant_id, user_email and foodItems

// router.delete("/:order_id", OrderController.delete_order);

module.exports = router;
