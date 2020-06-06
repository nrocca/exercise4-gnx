const graphql=require('graphql');
const gnx=require('@simtlix/gnx');
const Salaries=require('../models/salaries').Salaries;
const Employees=require('../models/employees').Employees;
const { timeObjectFields }=require('./typesTimeExtension/timeGraphQLObjectType');

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLFloat,
    GraphQLList
}=graphql;
const EmployeeType=require('./employee'); 

const SalaryType=new GraphQLObjectType({
    name:'Salary Type',
    description:'Represents Salaries',
    fields:()=>Object.assign(timeObjectFields,{
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
        salary:{
            type:GraphQLFloat
        }
    })
});

gnx.connect(Salaries,SalaryType,'salary','salaries');

module.exports=SalaryType;