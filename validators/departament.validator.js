const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;

const { Departaments } = require("../models/departments");

const CantRepeatName = {
  validate: async function (typeName, originalObj, materializedObj) {
    const ExistingDept = await Departaments.findOne({
      name: materializedObj.name,
    });
    if (ExistingDept && ExistingDept.id != materializedObj.id) {
      throw new CannotBeTwoDeptsWithSameNameError(typeName);
    }
  },
};
class CannotBeTwoDeptsWithSameNameError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Name cannot be repeated",
      "CannnotBeTwoDeptsWithSameNameError"
    );
  }
}

module.exports = { CantRepeatName };
