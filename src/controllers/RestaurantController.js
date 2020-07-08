const express = require("express");
const RestaurantService = require("../services/restaurant");
const Restaurant = require("../models/restaurant");

exports.fetch_all_restaurants = async (req, res, next) => {
  try {
    const restaurantList = await RestaurantService.get_all();
    res.status(200).json({
      message: "restaurant fetched successfully",
      restaurants: restaurantList.map((doc) => {
        return {
          _id: doc._id,
          name: doc.name,
          locations: doc.locations,
          description: doc.description,
          menu_id: doc.menu_id,
          ratings: doc.ratings,
          cost_for_two: doc.cost_for_two,
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
    const { restaurantData, es_message } = await RestaurantService.create(
      req.body
    );
    res.status(200).json({
      message: "restaurant added successfully",
      es_message,
      restaurant: {
        _id: restaurantData._id,
        name: restaurantData.name,
        locations: restaurantData.locations,
        menu_id: restaurantData.menu_id,
        ratings: restaurantData.ratings,
        description: restaurantData.description,
        cost_for_two: restaurantData.cost_for_two,
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
