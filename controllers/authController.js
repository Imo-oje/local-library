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

exports.redirectToLoginPage = asyncHandler(async (req, res, next) => {
  res.redirect("auth/login");
});

//========== signup handler ===========
exports.signup = asyncHandler(async (req, res, next) => {
  res.render("signup_form", { title: "signup" });
});

exports.signup_post = asyncHandler(async (req, res, next) => {
  const salt = crypto.randomBytes(16).toString("hex");
  crypto.pbkdf2(req.body.password, salt, 310000, 32, "sha256", async (error, hashedPassword) => {
    if (error) return next(error);
    try {
      //check if user exists
      const userExists = await User.findOne({ username: req.body.username });

      if (userExists) {
        console.log("user already exists!!!");
        console.log("Existing User", userExists);
        return res.redirect("/auth/login");
      }

      //user does'nt exist -- create and save user to data base
      const hashedPasswordHex = hashedPassword.toString("hex");
      const createUser = new User({
        username: req.body.username,
        family_name: req.body.family_name,
        first_name: req.body.first_name,
        password: hashedPasswordHex,
        salt: salt,
      });

      const savedUser = await createUser.save();

      const user = {
        id: savedUser._id,
        username: savedUser.username,
      };

      console.log(user);

      req.login(user, (error) => {
        if (error) return next(error);
        res.redirect("/");
      });
    } catch (error) {
      return next(error);
    }
  });
});

//======= login handler ===========
exports.login = asyncHandler(async (req, res, next) => {
  res.render("login_form", { title: "Login" });
});

exports.login_post = asyncHandler(async (req, res, next) => {});
