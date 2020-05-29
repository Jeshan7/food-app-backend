const express = require("express");
const RestaurantService = require("../services/restaurant");

exports.fetch_all_restaurants = async (req, res, next) => {
  try {
    const restaurantList = await RestaurantService.get_all();
    res.status(200).json({
      message: "restaurant fetched successfully",
      restaurants: restaurantList.map((doc) => {
        return {
          _id: doc._id,
          name: doc.name,
          location: doc.location,
          menu_id: doc.menu_id,
        };
      }),
    });
  } catch (error) {
    res.status(error.status).json({
      Error: error.message,
    });
  }
};

exports.add_restaurant = async (req, res, next) => {
  try {
    const newRestaurant = {
      name: req.body.name,
      location: req.body.location,
    };
    const restaurantData = await RestaurantService.create(newRestaurant);
    res.status(200).json({
      message: "restaurant added successfully",
      restaurant: {
        _id: restaurantData._id,
        name: restaurantData.name,
        location: restaurantData.location,
        menu_id: restaurantData.menu_id,
      },
    });
  } catch (e) {
    res.status(500).json({
      Error: e.message,
    });
  }
};

exports.delete_restaurant = async (req, res, next) => {
  try {
    console.log("sas", req.params.id);
    const status = await RestaurantService.delete(req.params.rest_id);
    if (status) {
      res.status(200).json({
        message: "Deleted successfully",
        status,
      });
    } else {
      res.status(200).json({
        message: "Not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      Error: error.message,
    });
  }
};
