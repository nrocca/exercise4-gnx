const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const Titles = require("../models/titles").Titles;
const Employees = require("../models/employees").Employees;

const EmployeeType = require("./employee");

const {
  From_DateMustBeSmallerThanTo_Date,
} = require("../validators/time.validator");
const {
  CannotDeleteDataFromAnExistingEmployee,
} = require("../validators/delete.validator");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const TitleType = new GraphQLObjectType({
  name: "TitleType",
  description: "Represents titles",
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
    title: { type: GraphQLString },
    employee: {
      type: EmployeeType,
      extensions: {
        relation: {
          connectionField: "empID",
        },
      },
      resolve: (parent, args) => {
        return Employees.findById(parent.empID);
      },
    },
  }),
});

gnx.connect(Titles, TitleType, "title", "titles");

module.exports = TitleType;
