const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");

/* GET users listing. */
router.get("/", function (req, res) {
  res.redirect("/catalog");
});

module.exports = router;
