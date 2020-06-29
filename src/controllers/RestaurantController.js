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
          menu_id: doc.menu_id,
          ratings: doc.ratings,
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
      locations: req.body.locations,
      ratings: req.body.ratings,
    };
    const { restaurantData, es_message } = await RestaurantService.create(
      newRestaurant
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

exports.fetch_suggestions = async (req, res, next) => {
  try {
    const data = await RestaurantService.query_suggestions(req.body);
    res.status(200).json({
      message: "fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      Error: error.message,
    });
  }
};

exports.fetch_restaurants = async (req, res, next) => {
  try {
    const restaurant = await RestaurantService.query_restaurants(req.query.q);
    res.status(200).json({
      message: "fetched successfully",
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      Error: error.message,
    });
  }
};
