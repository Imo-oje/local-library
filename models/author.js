const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// visuals for author's full name
AuthorSchema.virtual("name").get(function () {
  let fullName = "";
  if (this.first_name && this.family_name) {
    fullName = `${this.family_name} ${this.first_name}`;
  }
  return fullName;
});

// visuals for author's URL
AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

//visuals for formating dates
AuthorSchema.virtual("birth_date_formatted").get(function () {
  return this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
    : "unknown";
});

//visuals for formatting death date
AuthorSchema.virtual("death_date_formatted").get(function () {
  return this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    : "unknown";
});
//export model
module.exports = mongoose.model("Author", AuthorSchema);
