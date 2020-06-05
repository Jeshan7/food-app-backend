const express = require("express");
const OrderService = require("../services/orderService");

exports.fetch_all_orders = async (req, res, next) => {
  try {
    const orderList = await OrderService.get_all();
    res.status(200).json({
      message: "orders fetched successfully",
      orders: orderList.map((doc) => {
        return {
          _id: doc._id,
          user_id: doc.user_id,
          restaurant_id: doc.restaurant_id,
          foodItems: doc.foodItems,
          total_price: doc.total_price,
        };
      }),
    });
  } catch (error) {
    res.status(error.status).json({
      Error: error.message,
    });
  }
};

exports.add_order = async (req, res, next) => {
  try {
    const orderData = await OrderService.create(req.body);
    res.status(200).json({
      message: "order added successfully",
      orderData,
    });
  } catch (e) {
    res.status(500).json({
      Error: e.message,
    });
  }
};

// exports.delete_restaurant = async (req, res, next) => {
//   try {
//     const status = await RestaurantService.delete(req.params.rest_id);
//     if (status) {
//       res.status(200).json({
//         message: "Deleted successfully",
//         status,
//       });
//     } else {
//       res.status(200).json({
//         message: "Not found",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       Error: error.message,
//     });
//   }
// };
