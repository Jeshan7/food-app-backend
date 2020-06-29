const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosastic = require("mongoosastic");
const es = require("../config/elasticsearch");
const { createStream } = require("../elasticsearch/restaurantsMapping");

const restaurantSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true,
    es_indexed: true,
  },
  locations: {
    type: [String],
    required: true,
    es_indexed: true,
  },
  ratings: {
    type: Number,
    required: true,
    default: 4.5,
    es_indexed: true,
  },
  menu_id: {
    type: Schema.Types.ObjectId,
    ref: "Menu",
    default: null,
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
createStream();
module.exports = Restaurant;
