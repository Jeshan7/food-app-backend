const mongoose = require("mongoose");
const Restaurant = require("../models/restaurant");

exports.create = async (restaurant) => {
  try {
    const newRestaurant = new Restaurant({
      _id: new mongoose.Types.ObjectId(),
      name: restaurant.name,
      locations: restaurant.locations,
      ratings: restaurant.ratings,
    });
    const data = await newRestaurant.save();
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.get_all = async () => {
  try {
    const restaurantList = await Restaurant.find();
    return restaurantList;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.delete = async (id) => {
  try {
    const status = await Restaurant.findByIdAndDelete(id);
    return status;
  } catch (error) {
    throw new Error(error.message);
  }
};
