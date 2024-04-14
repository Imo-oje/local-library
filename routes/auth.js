const express = require("express");
const router = express.Router();

const auth_controller = require("../controllers/authController");

router.get("/", auth_controller.redirectToLoginPage);
router.get("/signup", auth_controller.signup);
router.post("/signup", auth_controller.signup_post);
router.get("/login", auth_controller.login);
router.post("/login", auth_controller.login_post);

module.exports = router;
