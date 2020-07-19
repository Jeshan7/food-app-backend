const mongoose = require("mongoose");
const FoodItem = require("../models/foodItem");
const Menu = require("../models/menu");

exports.get_all = async () => {
  try {
    const foodItemList = await FoodItem.find();
    return foodItemList;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.add = async (foodItem) => {
  try {
    const newFoodItem = new FoodItem({
      _id: new mongoose.Types.ObjectId(),
      name: foodItem.name,
      unit_price: foodItem.unit_price,
      category: foodItem.category,
      menu_id: foodItem.menu_id,
      dish_type: foodItem.dish_type,
    });
    const addedFoodItem = await newFoodItem.save();
    const menuItem = await Menu.findByIdAndUpdate(
      {
        _id: addedFoodItem.menu_id,
      },
      {
        $push: { foodItems: addedFoodItem },
      }
    );
    return addedFoodItem;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.remove_item = async (id) => {
  try {
    const status = await FoodItem.findByIdAndDelete(id);
    return status;
  } catch (error) {
    throw new Error(error.message);
  }
};
