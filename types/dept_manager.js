const graphql=require('graphql');
const gnx=require('@simtlix/gnx');
const Dept_Manager=require('../models/dept_manager').Dept_manager;
const Departaments=require('../models/departments').Departaments;
const Employees=require('../models/employees').Employees;
const { timeObjectFields }=require('./typesTimeExtension/timeGraphQLObjectType');

const {
    CantBeTwoManagersInTheSameDeptAtOnce
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

const Dept_ManagerType=new GraphQLObjectType({
    name:'Dept Manager Type',
    description:"Represents Dept's Manager",
    extensions:{
        validations:{
            'CREATE':
            [
                CantBeTwoManagersInTheSameDeptAtOnce
            ],
            'UPDATE':
            [
                CantBeTwoManagersInTheSameDeptAtOnce
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

gnx.connect(Dept_Manager,Dept_ManagerType,'dept_manager','dept_managers')

module.exports=Dept_ManagerType;