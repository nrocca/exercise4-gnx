const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salariesFields = {
  from_date: String,
  to_date: String,
  empID: mongoose.Schema.Types.ObjectId,
  salary: Number,
};

const salariesSchema = new Schema(salariesFields);

const Salaries = mongoose.model("Salary", salariesSchema, "salary");
if (!Salaries.collection.collection) {
  Salaries.createCollection();
}

module.exports = { salariesFields, Salaries };
