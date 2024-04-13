const asyncHandler = require("express-async-handler");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/User");
const crypto = require("crypto");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = User.findOne({ username: username });

      if (!user) {
        return done(null, false, {
          message: "Incorrect username or password,",
        });
      }

      crypto.pbkdf2(password, user.salt, 310000, 32, "sha256", (error, hashedPassword) => {
        if (error) return done(error);

        if (!crypto.timingSafeEqual(Buffer.from(user.password, "hex"), hashedPassword)) {
          return done(null, false, {
            message: "Incorrect username or Password.",
          });
        }
        return done(null, user);
      });
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  res.status(404).json("i dont have that page!");
});
