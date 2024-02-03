const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const genreSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLenght: 100 },
});

// virtual for genre's URL
genreSchema.virtual("url").get(function () {
  return `/catalog/genre/${this._id}`;
});

//export module
module.exports = mongoose.model("Genre", genreSchema);
