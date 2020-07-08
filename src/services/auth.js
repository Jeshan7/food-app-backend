const mongoose = require("mongoose");
const User = require("../models/user");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const util = require("util");

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
    // if (userDetails) {
    //   const userPassword = await argon2.verify(
    //     userData.password,
    //     user.password
    //   );
    //   if (userPassword) {
    //     const token = await jwt.sign(
    //       { email: userData.email, password: userData.password },
    //       process.env.JWT_SECRET_KEY
    //     );
    //   }
    // }
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

exports.search_users = async () => {
  try {
    return await User.search(
      {
        query_string: {
          query: "jak",
        },
      },
      {
        hydrate: true,
        hydrateWithESResults: true,
        hydrateOptions: { select: "name" },
      },
      (err, result) => {
        console.log(result.hits.hits);
        result.hits.hits.map((data) => {
          console.log("saaas", data);
        });
      }
    );
    // const asyncFunction = util.promisify(voidFunction);
    // const results = await User.search(
    //   {
    //     query_string: {
    //       query: "jak",
    //     },
    //   }
    // { hydrate: false, hydrateOptions: { lean: true } }
    // );
    // console.log("saadads", results);
  } catch (error) {
    throw new Error(error.message);
  }
  // return result;

  // );
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
