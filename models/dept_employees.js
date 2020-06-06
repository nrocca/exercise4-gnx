const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dept_employeesFields={
    empId:Schema.Types.ObjectId,
    deptID:Schema.Types.ObjectId,
};

const dept_employeeSchema=new Schema(departamentFields);

const Dept_employees=mongoose.model('Dept_employees',dept_employeeSchema);
if (!Dept_employees.collection.collection){
    Dept_employees.createCollection();
}

module.exports={Dept_employees,dept_employeesFields}