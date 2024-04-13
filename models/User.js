const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSChema = new Schema({
  username: { type: String, required: true, maxLenght: 40, unique: true },
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true },
  salt: { type: String, required: true },
});

UserSChema.virtual("name").get(function () {
  let fullName = "";
  if (this.first_name && this.family_name) {
    fullName = `${this.family_name} ${this.first_name}`;
  }
  return fullName;
});

UserSChema.virtual("url").get(function () {
  return `/${this.username}`;
});

module.exports = mongoose.model("User", UserSChema);
