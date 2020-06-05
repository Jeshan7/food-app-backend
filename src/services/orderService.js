const mongoose = require("mongoose");
const Order = require("../models/order");
const User = require("../models/user");
const FoodItem = require("../models/foodItem");

exports.get_all = async () => {
  try {
    const orderList = await Order.find().populate("foodItems", "name");
    return orderList;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.create = async (order) => {
  try {
    const user = await User.findOne({ email: order.user_email });
    const foodItems = await FoodItem.find({ _id: { $in: order.foodItems } });
    const total_price = foodItems
      .map((doc) => {
        return doc.unit_price;
      })
      .reduce((total, val) => {
        return total + val;
      });
    const newOrder = new Order({
      _id: new mongoose.Types.ObjectId(),
      restaurant_id: order.restaurant_id,
      user_id: user._id,
      foodItems: order.foodItems,
      total_price,
    });
    const orderData = await newOrder.save();
    const updatedUser = await User.findByIdAndUpdate(
      { _id: orderData.user_id },
      { $push: { orders: orderData } }
    );
    return orderData;
  } catch (error) {
    throw new Error(error.message);
  }
};

// exports.delete = async (id) => {
//   try {
//     const status = await Menu.findByIdAndDelete(id);
//     return status;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };
