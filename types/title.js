const graphql=require('graphql');
const gnx=require('@simtlix/gnx');
const Titles=require('../models/titles').Titles;
const Employees=require('../models/employees').Employees;
const { timeObjectFields }=require('./typesTimeExtension/timeGraphQLObjectType');

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLList
}=graphql;
const EmployeeType=require('./employee');

const TitleType=new GraphQLObjectType({
    name:'Title Type',
    description:'Represents titles',
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
        title:GraphQLString
    })
});

gnx.connect(Titles,TitleType,'title','titles');

module.exports=TitleType;