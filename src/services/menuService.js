const mongoose = require("mongoose");
const Menu = require("../models/menu");
const Restaurant = require("../models/restaurant");

exports.get_all = async () => {
  try {
    const menuList = await Menu.find().populate("foodItems");
    return menuList;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.add = async (id) => {
  try {
    const newMenu = new Menu({
      _id: new mongoose.Types.ObjectId(),
      restaurant_id: id,
    });
    const menu = await newMenu.save();
    const data = await Restaurant.findByIdAndUpdate(
      { _id: menu.restaurant_id },
      { menu_id: menu._id }
    );
    return menu;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.delete = async (id) => {
  try {
    const status = await Menu.findByIdAndDelete(id);
    return status;
  } catch (error) {
    throw new Error(error.message);
  }
};
