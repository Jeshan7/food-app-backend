const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  foodItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "FoodItem",
    },
  ],
  restaurant_id: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  total_price: {
    type: Number,
    required: true,
  },
});

const Restaurant = mongoose.model("Order", orderSchema);
module.exports = Restaurant;
