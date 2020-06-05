const mongoose = require("mongoose");
const User = require("../models/user");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

exports.create = async (user) => {
  try {
    const hash = await argon2.hash(user.password);
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      name: user.name,
      email: user.email,
      password: hash,
    });
    const userDetails = await newUser.save();
    return userDetails;
  } catch (e) {
    throw new Error(e);
  }
};

exports.authenticate = async (user) => {
  try {
    const userData = await User.findOne({ email: user.email });
    if (!userData) {
      throw new Error("User not found");
    } else {
      const userPassword = await argon2.verify(
        userData.password,
        user.password
      );
      if (userPassword) {
        const token = await jwt.sign(
          { email: userData.email, password: userData.password },
          process.env.JWT_SECRET_KEY
        );
        return {
          currentUser: {
            name: userData.name,
            email: userData.email,
          },
          token,
        };
      } else {
        throw new Error("Wrong Password");
      }
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.getAllUsers = async () => {
  const users = await User.find().populate("orders");
  return users;
};
// exports.remove = async (id) => {
//   // console.log(id)
//   const user = User.findByIdAndDelete({ _id: id });

//   if (user) {
//     return user;
//   } else {
//     throw new Error("User not found");
//   }
// };
