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
          locations: data.locations,
          ratings: data.ratings,
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

exports.query_suggestions = async (query) => {
  try {
    const { body } = await es.search({
      index: "restaurants",
      body: {
        _source: ["restaurant_id", "name", "locations"],
        suggest: {
          suggest_data: {
            text: query.name,
            completion: {
              field: "search_name",
            },
          },
        },
      },
    });
    console.log(body.suggest.suggest_data[0].options);
    const result = body.suggest.suggest_data[0].options
      .map((doc) => {
        if (doc._source.locations.includes(query.location)) {
          return {
            restaurant_id: doc._source.restaurant_id,
            name: doc._source.name,
          };
        } else {
          return undefined;
        }
      })
      .filter((data) => {
        return data !== undefined;
      });
    return result;
  } catch (error) {
    // console.log(error.meta.body);
    throw new Error(error.message);
  }
};

exports.query_restaurants = async (query) => {
  try {
    const { body } = await es.search({
      index: "restaurants",
      body: {
        _source: ["restaurant_id", "name", "locations", "ratings"],
        query: {
          query_string: {
            query: query,
            default_field: "name",
          },
        },
      },
    });

    const result = body.hits.hits[0]._source;
    return result;
  } catch (error) {
    // console.log(error.meta.body);
    throw new Error(error.message);
  }
};
