// Set up mongoose connection
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const dev_db_url = process.env.MONGODB_DEV;
const mongoDB = process.env.MONGODB_URI || dev_db_url;

dataBase().catch((err) => console.log(err));
async function dataBase() {
  await mongoose.connect(mongoDB);
}

module.exports = { dataBase };

// All you need to do is require this module in app.js, no need to even assign it to a constant. just require("./db")
