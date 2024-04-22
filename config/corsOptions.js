const allowedOrigins = require("./allowedOrigin");

const corsOptions = {
  origin: (origin, cb) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      cb(null, true);
    } else {
      cb(new Error("Origin not allowed by CORS!"));
    }
  },
  Credentials: true,
  OptionSuccessRate: 200,
};

module.exports = corsOptions;
