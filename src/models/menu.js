const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  restaurant_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  foodItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "FoodItem",
    },
  ],
});

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
