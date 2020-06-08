const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departamentFields = {
  dept_name: String,
};

const departamentSchema = new Schema(departamentFields);

const Departaments = mongoose.model("Departament", departamentSchema);
if (!Departaments.collection.collection) {
  Departaments.createCollection();
}

module.exports = { departamentFields, Departaments };
