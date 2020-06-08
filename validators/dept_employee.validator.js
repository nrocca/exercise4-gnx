const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;

const { Dept_employees } = require("../models/dept_employees");

const OneEmployeeCantHaveTwoTitlesInOneDeptAtOnce = {
  validate: async function (typeName, originalObj, materializedObj) {
    const prevEmployee = await Dept_employees.findOne({
      empID: materializedObj.empID,
    });
    if (prevEmployee) {
      if (
        (materializedObj.from_date >= prevEmployee.from_date &&
          prevEmployee.to_date >= materializedObj.from_date) ||
        (materializedObj.to_date >= prevEmployee.from_date &&
          prevEmployee.to_date >= materializedObj.to_date)
      ) {
        throw new EmployeeCantHaveMoreThanOneTitleInTheSameDeptAtTheSameTimeError(
          typeName
        );
      }
    }
  },
};
class EmployeeCantHaveMoreThanOneTitleInTheSameDeptAtTheSameTimeError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "An employee cannot be assigned to the same Dept more than once at the same time",
      "EmployeeCantHaveMoreThanOneTitleInTheSameDeptError"
    );
  }
}

module.exports = { OneEmployeeCantHaveTwoTitlesInOneDeptAtOnce };
