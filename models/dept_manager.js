const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dept_managerFields = {
  from_date: String,
  to_date: String,
  empID: mongoose.Schema.Types.ObjectId,
  deptID: mongoose.Schema.Types.ObjectId,
};

const dept_managerSchema = new Schema(dept_managerFields);

const Dept_manager = mongoose.model("Dept_manager", dept_managerSchema);
if (!Dept_manager.collection.collection) {
  Dept_manager.createCollection();
}

module.exports = { dept_managerFields, Dept_manager };
