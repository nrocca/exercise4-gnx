const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const Salaries = require("../models/salaries").Salaries;
const Employees = require("../models/employees").Employees;

const EmployeeType = require("./employee");

const {
  From_DateMustBeSmallerThanTo_Date,
} = require("../validators/time.validator");
const {
  CannotDeleteDataFromAnExistingEmployee,
} = require("../validators/delete.validator");

const { GraphQLObjectType, GraphQLFloat, GraphQLID, GraphQLString } = graphql;

const SalaryType = new GraphQLObjectType({
  name: "SalaryType",
  description: "Represents Salaries",
  extensions: {
    validations: {
      'CREATE': [From_DateMustBeSmallerThanTo_Date],
      'UPDATE': [From_DateMustBeSmallerThanTo_Date],
      'DELETE': [CannotDeleteDataFromAnExistingEmployee],
    },
  },
  fields: () => ({
    id: { type: GraphQLID },
    from_date: { type: GraphQLString },
    to_date: { type: GraphQLString },
    employee: {
      type: EmployeeType,
      extensions: {
        relation: {
          embedded: false,
          connectionField: "empID",
        },
      },
      resolve: (parent, args) => {
        return Employees.findById(parent.empID);
      },
    },
    salary: {
      type: GraphQLFloat,
    },
  }),
});

gnx.connect(Salaries, SalaryType, "salary", "salaries");

module.exports = SalaryType;
