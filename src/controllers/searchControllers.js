const express = require("express");
const SearchService = require("../services/searchServices");

exports.fetch_suggestions = async (req, res, next) => {
  try {
    const restaurants = await SearchService.query_suggestions(req.body);
    res.status(200).json({
      message: "fetched successfully",
      restaurants,
    });
    // console.log("aaa", restaurant);
  } catch (error) {
    res.status(500).json({
      Error: error.message,
    });
  }
};

exports.fetch_restaurants = async (req, res, next) => {
  try {
    console.log(req.query);
    const restaurants = await SearchService.query_search(req.query.q);
    res.status(200).json({
      message: "fetched successfully",
      restaurants,
    });
  } catch (error) {
    res.status(500).json({
      Error: error.message,
    });
  }
};

exports.filter_restaurants = async (req, res, next) => {
  try {
    const restaurants = await SearchService.query_filter(req.body);
    res.status(200).json({
      message: "fetched successfully",
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Error: error.message,
    });
  }
};
