const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const Employees = require("../models/employees").Employees;

const SexType = require("./enum/sexType");

const {
  CantRepeatDNI,
  EmployeesMustBeOver18,
} = require("../validators/employee.validator.js");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;

const EmployeeType = new GraphQLObjectType({
  name: "EmployeeType",
  description: "Represents Employees",
  extensions: {
    validations: {
      'CREATE': [CantRepeatDNI, EmployeesMustBeOver18],
      'UPDATE': [CantRepeatDNI, EmployeesMustBeOver18],
    },
  },
  fields: () => ({
    id: { type: GraphQLID },
    dni: { type: GraphQLInt },
    birth_date: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    gender: { type: SexType },
    hire_date: { type: GraphQLString },
  }),
});

gnx.connect(Employees, EmployeeType, "employee", "employees");

module.exports = EmployeeType;
