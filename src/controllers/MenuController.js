const mongoose = require("mongoose");
const MenuService = require("../services/menuService");

exports.fetch_all_menus = async (req, res, next) => {
  try {
    const menuList = await MenuService.get_all();
    if (menuList.length > 0) {
      res.status(200).json({
        message: "fetched successfully",
        menuList: menuList.map((doc) => {
          return {
            _id: doc._id,
            restaurant_id: doc.restaurant_id,
            foodItems: doc.foodItems.map((doc) => {
              return {
                _id: doc._id,
                name: doc.name,
                quantity: doc.quantity,
                category: doc.category,
                menu_id: doc.menu_id,
                unit_price: doc.unit_price,
              };
            }),
          };
        }),
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
    const menu = await MenuService.add(req.body.restaurant_id);
    res.status(200).json({
      message: "menu added successfully",
      menu: {
        _id: menu._id,
        foodItems: menu.foodItems,
        restaurant_id: menu.restaurant_id,
      },
    });
  } catch (error) {
    res.status(500).json({
      Error: error.message,
    });
  }
};

exports.delete_menu = async (req, res, next) => {
  try {
    const status = await MenuService.delete(req.params.menu_id);
    res.status(200).json({
      message: "deleted successfully",
      status,
    });
  } catch (error) {
    res.status(500).json({
      Error: error.message,
    });
  }
};
