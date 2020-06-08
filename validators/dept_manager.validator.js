const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;

const { Dept_manager } = require("../models/dept_manager");

const CantBeTwoManagersInTheSameDeptAtOnce = {
  validate: async function (typeName, originalObj, materializedObj) {
    const overlappedManager = await Dept_manager.findOne({
      empID: materializedObj.empID,
    });
     if (overlappedManager) {
        if (
      (materializedObj.from_date >= overlappedManager.from_date &&
        overlappedManager.to_date >= materializedObj.from_date) ||
      (materializedObj.to_date >= overlappedManager.from_date &&
        overlappedManager.to_date >= materializedObj.to_date)
    ) {
      throw new OverlappingManagementScheduleError(typeName);
    }}
  },
};
class OverlappingManagementScheduleError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Cannot assign more than one manager in a Dept in the same portion of time",
      "OverlappingManagementScheduleError"
    );
  }
}

module.exports = { CantBeTwoManagersInTheSameDeptAtOnce };
