const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const titlesFields = {
  from_date: String,
  to_date: String,
  empID: mongoose.Schema.Types.ObjectId,
  title: String,
};

const titleSchema = new Schema(titlesFields);

const Titles = mongoose.model("Titles", titleSchema);
if (!Titles.collection.collection) {
  Titles.createCollection();
}

module.exports = { titlesFields, Titles };
