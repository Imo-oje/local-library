const express = require("express");
const router = express.Router();

// render index/home page. conditionally
router.get(
  "/",
  function (req, res, next) {
    if (!req.user) return res.render("home", { title: "Home page" });
    next();
  },
  (req, res) => {
    res.redirect("/catalog");
  }
);

module.exports = router;
