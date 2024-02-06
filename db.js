// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB =
  "mongodb+srv://savvyplus018:imooje@library.yxkliql.mongodb.net/local_library?retryWrites=true&w=majority";

dataBase().catch((err) => console.log(err));
async function dataBase() {
  await mongoose.connect(mongoDB);
}

module.exports = { dataBase };

// All you need to do is require this module in app.js, no need to even assign it to a constant. just require("./db")
