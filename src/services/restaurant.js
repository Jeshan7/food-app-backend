const mongoose = require("mongoose");
const Restaurant = require("../models/restaurant");
const es = require("../config/elasticsearch");

exports.create = async (restaurant) => {
  try {
    const newRestaurant = new Restaurant({
      _id: new mongoose.Types.ObjectId(),
      name: restaurant.name,
      locations: restaurant.locations,
      ratings: restaurant.ratings,
      description: restaurant.description,
      cost_for_two: restaurant.cost_for_two,
    });
    const data = await newRestaurant.save();
    if (data) {
      // Create index for added data in elastic search
      const sugggestName = data.name.split(" ");
      const { body } = await es.index({
        index: "restaurants",
        body: {
          restaurant_id: data._id,
          name: data.name,
          search_name: {
            input: sugggestName,
          },
          description: data.description,
          locations: data.locations,
          ratings: data.ratings,
          cost_for_two: data.cost_for_two,
        },
      });
      await es.indices.refresh({ index: "restaurants" });
      return { restaurantData: data, es_message: body.result };
    }
  } catch (err) {
    console.log(err.meta);
    throw new Error(err.message);
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
