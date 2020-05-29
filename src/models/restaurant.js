const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  menu_id: {
    type: Schema.Types.ObjectId,
    ref: "Menu",
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
