const mongoose = require("mongoose");
const AuthService = require("../services/auth");

exports.fetch_all_users = async (req, res, next) => {
  console.log("as", req,currentUser);
  const users = await AuthService.getAllUsers();
  res.status(200).json({
    users: users.map((user) => {
      return { name: user.name, email: user.email };
    }),
  });
};

exports.add_new_user = async (req, res, next) => {
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
        const newUser = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        };
        const user = await AuthService.create(newUser);

        res.status(200).json({
          message: "User created",
          user: {
            name: user.name,
            email: user.email,
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
