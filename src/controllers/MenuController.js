const mongoose = require("mongoose");
const MenuService = require("../services/menuService");

exports.fetch_all_menus = async (req, res, next) => {
  try {
    const menuList = await MenuService.get_all();
    if (menuList.length > 1) {
      res.status(200).json({
        message: "fetched successfully",
        menuList,
      });
    } else {
      res.status(200).json({
        message: "No menu found",
      });
    }
  } catch (error) {
    res.status(500).json({
      Error: error.message,
    });
  }
};

exports.add_menu = async (req, res, next) => {
  try {
    console.log("aass");
  } catch (error) {
    res.status(500).json({
      Error: error.message,
    });
  }
};
