const express = require("express");
const router = express.Router();

const auth_controller = require("../controllers/authController");

router.get("/login", auth_controller.login);

module.exports = router;
