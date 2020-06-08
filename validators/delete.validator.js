const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;

const { Departaments } = require("../models/departments");
const { Employees } = require("../models/employees");

const CantDeleteDataWithDeptOrEmpAttached = {
  validate: async function (typeName, originalObj, materializedObj) {
    const employeeFinded = await Employees.findOne({id:materializedObj.empID});
    if (employeeFinded) {
      throw new CantDeleteDataWithEmpAttachedError(typeName);
    }
    const deptFinded = await Departaments.findById(materializedObj.deptID);
    if (deptFinded) {
      throw new CantDeleteDataWithDeptAttachedError(typeName);
    }
  },
};

const CannotDeleteDataFromAnExistingEmployee = {
  validate: async function (typeName, originalObj, materializedObj) {
    const employee = await Employees.findOne({id:materializedObj.empID});
    if (employee) {
      throw new CantDeleteDataWithEmpAttachedError(typeName);
    }
  },
};
class CantDeleteDataWithEmpAttachedError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Cannot delete a document that holds information from an employee",
      "CantDeleteDataWithEmpAttachedError"
    );
  }
}
class CantDeleteDataWithDeptAttachedError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Cannot delete a document that holds information from a dept",
      "CantDeleteDataWithDeptAttachedError"
    );
  }
}

module.exports = {
  CantDeleteDataWithDeptOrEmpAttached,
  CannotDeleteDataFromAnExistingEmployee,
};
