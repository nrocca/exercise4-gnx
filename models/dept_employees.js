const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dept_employeesFields = {
  from_date: String,
  to_date: String,
  empID: mongoose.Schema.Types.ObjectId,
  deptID: mongoose.Schema.Types.ObjectId,
};

const dept_employeeSchema = new Schema(dept_employeesFields);

const Dept_employees = mongoose.model("Dept_employees", dept_employeeSchema);
if (!Dept_employees.collection.collection) {
  Dept_employees.createCollection();
}

module.exports = { Dept_employees, dept_employeesFields };
