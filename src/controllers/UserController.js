const mongoose = require("mongoose");
const AuthService = require("../services/auth");
const User = require("../models/user");

exports.fetch_all_users = async (req, res, next) => {
  const users = await AuthService.getAllUsers();
  res.status(200).json({
    users: users.map((user) => {
      return {
        name: user.name,
        email: user.email,
        orders: user.orders.map((doc) => {
          return {
            _id: doc._id,
            user_id: doc.user_id,
            restaurant_id: doc.restaurant_id,
            total_price: doc.total_price,
            foodItems: doc.foodItems,
          };
        }),
      };
    }),
  });
};

exports.add_new_user = async (req, res, next) => {
  console.log("dd", req.body);
  if (
    req.body.name &&
    req.body.email &&
    req.body.password &&
    req.body.repeatPassword
  ) {
    if (req.body.password !== req.body.repeatPassword) {
      res.status(500).json({
        error: "Passwords are different",
      });
    } else {
      try {
        const user = await AuthService.create(req.body);
        res.status(200).json({
          message: "User created",
          user: {
            name: user.name,
            email: user.email,
            orders: user.orders,
          },
        });
      } catch (err) {
        res.status(500).json({
          error: err.message,
        });
      }
    }
  } else {
    res.status(500).json({
      error: "All fields are required",
    });
  }
};

exports.login_user = async (req, res, next) => {
  if (req.body.email && req.body.password) {
    try {
      const user = {
        email: req.body.email,
        password: req.body.password,
      };
      const { currentUser, token } = await AuthService.authenticate(user);
      res.status(200).json({
        message: "Authentication successful",
        currentUser,
        token,
      });
    } catch (err) {
      res.status(401).json({
        Error: err.message,
      });
    }
  } else {
    res.status(500).json({
      Error: "All fields are required",
    });
  }
};

// exports.delete_user = async (req, res, next) => {
//   try {
//     const user_id = req.params.userId;
//     const query_status = await AuthService.remove(user_id);
//   } catch (err) {
//     res.status(err.status).json({
//       Error: err.message,
//     });
//   }
// };

exports.search_query = (req, res, next) => {
  res.redirect("/search?q=" + req.body.q);
};

exports.searchUsers = async (req, res, next) => {
  try {
    User.search(
      {
        query_string: {
          query: req.query.q,
        },
      },
      {
        hydrate: true,
        // hydrateWithESResults: true,
        // hydrateOptions: { select: "name" },
      },
      (err, result) => {
        if (result.hits.hits.length > 0) {
          res.status(200).json({
            data: result.hits.hits.map((doc) => {
              return {
                _id: doc._id,
                name: doc.name,
                email: doc.email,
                orders: doc.orders,
              };
            }),
          });
        } else {
          res.status(500).json({
            Error: "No data found",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      Error: error.message,
    });
  }
};
