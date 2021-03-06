const mongoose = require("mongoose");
const FoodItemService = require("../services/foodItemService");

exports.fetch_all_fooditems = async (req, res, next) => {
  try {
    const foodItemList = await FoodItemService.get_all();
    if (foodItemList.length > 1) {
      res.status(200).json({
        message: "fetched successfully",
        foodItemList: foodItemList.map((doc) => {
          return {
            _id: doc._id,
            name: doc.name,
            quantity: doc.quantity,
            category: doc.category,
            menu_id: doc.menu_id,
            unit_price: doc.unit_price,
            dish_type: doc.dish_type,
          };
        }),
      });
    } else {
      res.status(200).json({
        message: "No food item found",
      });
    }
  } catch (error) {
    res.status(500).json({
      Error: error.message,
    });
  }
};

exports.add_foodItem = async (req, res, next) => {
  try {
    const foodItem = await FoodItemService.add(req.body);
    res.status(200).json({
      message: "food item added successfully",
      foodItem: {
        _id: foodItem._id,
        name: foodItem.name,
        quantity: foodItem.quantity,
        category: foodItem.category,
        menu_id: foodItem.menu_id,
        unit_price: foodItem.unit_price,
        dish_type: foodItem.dish_type,
      },
    });
  } catch (error) {
    res.status(500).json({
      Error: error.message,
    });
  }
};

exports.delete_foodItem = async (req, res, next) => {
  try {
    const status = await FoodItemService.remove_item(req.params.id);
    res.status(200).json({
      message: "deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      Error: error.message,
    });
  }
};
