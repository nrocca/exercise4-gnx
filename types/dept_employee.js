const graphql=require('graphql');
const gnx=require('@simtlix/gnx');
const Dept_employees=require('../models/dept_employees').Dept_employees;
const Departaments=require('../models/departments').Departaments;
const Employees=require('../models/employees').Employees;
const { timeObjectFields }=require('./typesTimeExtension/timeGraphQLObjectType');

const {
    CantBeTwoEmployeesInTheSameDeptAtOnce,
    OneEmployeeCantHaveTwoTitlesInOneDept
}=require('../validators/dept_employee.validator');

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLList
}=graphql;
const EmployeeType=require('./employee');
const DepartamentType=require('./departament');

const Dept_EmployeeType=new GraphQLObjectType({
    name:'Dept Employee Type',
    description:"Represents Dept's Employee",
    extensions:{
        validations:{
            'CREATE':
            [
                CantBeTwoEmployeesInTheSameDeptAtOnce,
                OneEmployeeCantHaveTwoTitlesInOneDept
            ],
            'UPDATE':
            [
                CantBeTwoEmployeesInTheSameDeptAtOnce,
                OneEmployeeCantHaveTwoTitlesInOneDept
            ]
        }
    },
    fields: ()=>Object.assign(timeObjectFields,{
        employee:{
            type:EmployeeType,
            extensions:{
                relation:{
                    embedded:false,
                    connectionField:'EmpID'
                }
            },
            resolve:(parent,args)=>{
                return Employees.findById({'EmpID':parent.id})
            }
        },
        dept:{
            type:DepartamentType,
            extensions:{
                relation:{
                    embedded:false,
                    connectionField:'DeptID'
                }
            },
            resolve:(parent,args)=>{
                return Departaments.findById({'DeptID':parent.id})
            }
        }
    })
});

gnx.connect(Employees,EmployeeType,'dept_employee','dept_employees');

module.exports=Dept_EmployeeType;
