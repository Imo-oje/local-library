const express = require("express");
const router = express.Router();

const dashboard_controller = require("../controllers/dashboardController");

router.get("/", dashboard_controller.index);

module.exports = router;
