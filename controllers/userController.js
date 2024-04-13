const User = require("../models/User");
const asyncHandler = require("express-async-handler");

exports.profile = asyncHandler(async (req, res, next) => {
  res.send("User profile here");
});
