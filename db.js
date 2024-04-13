// Set up mongoose connection
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const dev_db_url =
  "mongodb+srv://savvyplus018:imooje@library.yxkliql.mongodb.net/local_library?retryWrites=true&w=majority";
const mongoDB = process.env.MONGODB_URI || dev_db_url;

dataBase().catch((err) => console.log(err));
async function dataBase() {
  await mongoose.connect(dev_db_url);
}

module.exports = { dataBase };
