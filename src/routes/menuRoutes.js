const express = require("express");
const router = express.Router();
const MenuController = require("../controllers/MenuController");

router.get("/", MenuController.fetch_all_menus);

router.post("/", MenuController.add_menu);

router.delete("/:menu_id", MenuController.delete_menu);

module.exports = router;
