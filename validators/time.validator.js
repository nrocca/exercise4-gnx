const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;

const From_DateMustBeSmallerThanTo_Date = {
  validate: async function (typeName, originalObj, materializedObj) {
    if (materializedObj.from_date >= materializedObj.to_date) {
      throw new TimePeriodError(typeName);
    }
  },
};
class TimePeriodError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "From_Date must strictly be before To_Date",
      "TimePeriodError"
    );
  }
}

module.exports = { From_DateMustBeSmallerThanTo_Date };
