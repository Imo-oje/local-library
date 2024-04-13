const asyncHandler = require("express-async-handler");

exports.login = asyncHandler(async (req, res, next) => {
  res.status(404).json("i dont have that page!");
});
