const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    require: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    require: true,
  },
  unit_price: {
    type: String,
    require: true,
  },
  menu_id: {
    type: Schema.Types.ObjectId,
    ref: "Menu",
    default: null,
  },
});

const FoodItem = mongoose.model("FoodItem", menuSchema);
module.exports = FoodItem;
