const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const checkAuth = require("../middlewares/checkAuth");

router.get("/", UserController.fetch_all_users);

router.post("/sign-up", UserController.add_new_user);

router.post("/sign-in", UserController.login_user);

// router.delete("/:userId", UserController.delete_user);

module.exports = router;
