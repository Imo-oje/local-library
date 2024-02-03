// Set up mongoose connection
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const mongoDB =
  "mongodb+srv://savvyplus018:imooje@library.yxkliql.mongodb.net/local_library?retryWrites=true&w=majority";

async function dataBase() {
  await mongoose.connect(mongoDB);
}

dataBase().catch((err) => console.log(err));

module.exports = { dataBase };
