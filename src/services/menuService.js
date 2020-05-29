const mongoose = require("mongoose");
const Menu = require("../models/menu");

exports.get_all = async () => {
  try {
    const menuList = await Menu.find();
    return menuList;
  } catch (error) {
    throw new Error(error.message);
  }
};
