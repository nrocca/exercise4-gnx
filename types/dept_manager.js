const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const Dept_Manager = require("../models/dept_manager").Dept_manager;
const Departaments = require("../models/departments").Departaments;
const Employees = require("../models/employees").Employees;

const EmployeeType = require("./employee");
const DepartamentType = require("./departament");

const {
  CantBeTwoManagersInTheSameDeptAtOnce,
} = require("../validators/dept_manager.validator");
const {
  From_DateMustBeSmallerThanTo_Date,
} = require("../validators/time.validator");
const {
  CantDeleteDataWithDeptOrEmpAttached,
} = require("../validators/delete.validator");

const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;

const Dept_ManagerType = new GraphQLObjectType({
  name: "Dept_managerType",
  description: "Represents Dept's Manager",
  extensions: {
    validations: {
      'CREATE': [
        From_DateMustBeSmallerThanTo_Date,
        CantBeTwoManagersInTheSameDeptAtOnce,
      ],
      'UPDATE': [
        From_DateMustBeSmallerThanTo_Date,
        CantBeTwoManagersInTheSameDeptAtOnce,
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

gnx.connect(Dept_Manager, Dept_ManagerType, "dept_manager", "dept_managers");

module.exports = Dept_ManagerType;
