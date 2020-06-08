const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeesFields = {
  dni: Number,
  birth_date: String,
  first_name: String,
  last_name: String,
  gender: String,
  hire_date: String,
};

const employeesSchema = new Schema(employeesFields);

const Employees = mongoose.model("Employees", employeesSchema);
if (!Employees.collection.collection) {
  Employees.createCollection();
}

module.exports = { employeesFields, Employees };
