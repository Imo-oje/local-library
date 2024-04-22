const User = require("../models/User");
const asyncHandler = require("express-async-handler");

exports.get_users = asyncHandler(async (req, res, next) => {
  const users = await User.find().lean().exec();

  if (!users || users.length < 1) {
    return res.json({ message: "no users found" });
  }

  res.json(users);
});
