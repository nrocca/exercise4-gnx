const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const moment = require("moment");

const { Employees } = require("../models/employees");

const CantRepeatDNI = {
  validate: async function (typeName, originalObj, materializedObj) {
    const ExistingDNI = await Employees.findOne({ dni: materializedObj.dni });
    if (ExistingDNI) {
      throw new CannotBeTwoEmployeesWithSameDNIError(typeName);
    }
  },
};
class CannotBeTwoEmployeesWithSameDNIError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "DNI cannot be repeated",
      "CannotBeTwoEmployeesWithSameDNIError"
    );
  }
}

const EmployeesMustBeOver18 = {
  validate: async function (typeName, originalObj, materializedObj) {
    const employeeAge= await moment().year() - moment(materializedObj.birth_date).year();
    if (employeeAge < 18) {
      throw new CannotRegisterEmployeeUnder18(typeName);
    }
  },
};
class CannotRegisterEmployeeUnder18 extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Employees Cannot be under 18",
      "CannotRegisterEmployeeUnder18"
    );
  }
}
module.exports = { CantRepeatDNI, EmployeesMustBeOver18 };
