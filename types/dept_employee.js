const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const Dept_employees = require("../models/dept_employees").Dept_employees;
const Departaments = require("../models/departments").Departaments;
const Employees = require("../models/employees").Employees;

const EmployeeType = require("./employee");
const DepartamentType = require("./departament");

const {
  OneEmployeeCantHaveTwoTitlesInOneDeptAtOnce,
} = require("../validators/dept_employee.validator");
const {
  From_DateMustBeSmallerThanTo_Date,
} = require("../validators/time.validator");
const {
  CantDeleteDataWithDeptOrEmpAttached,
} = require("../validators/delete.validator");

const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;

const Dept_EmployeeType = new GraphQLObjectType({
  name: "Dept_employeeType",
  description: "Represents Dept's Employee",
  extensions: {
    validations: {
      'CREATE': [
        From_DateMustBeSmallerThanTo_Date,
        OneEmployeeCantHaveTwoTitlesInOneDeptAtOnce,
      ],
      'UPDATE': [
        From_DateMustBeSmallerThanTo_Date,
        OneEmployeeCantHaveTwoTitlesInOneDeptAtOnce,
      ],
      'DELETE': [CantDeleteDataWithDeptOrEmpAttached],
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
          connectionField: "empID",
        },
      },
      resolve: (parent, args) => {
        return Employees.findById(parent.empID);
      },
    },
    dept: {
      type: DepartamentType,
      extensions: {
        relation: {
          connectionField: "deptID",
        },
      },
      resolve: (parent, args) => {
        return Departaments.findById(parent.deptID);
      },
    },
  }),
});

gnx.connect(
  Dept_employees,
  Dept_EmployeeType,
  "dept_employee",
  "dept_employees"
);

module.exports = Dept_EmployeeType;
