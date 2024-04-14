const asyncHandler = require("express-async-handler");

exports.index = function (req, res, next) {
  if (!req.user) {
    return res.redirect("/auth/login");
  } else {
    res.render("dashboard", { title: "Dashboard", user: req.user });
  }
};
