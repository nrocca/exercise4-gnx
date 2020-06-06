const graphql=require('graphql');
const gnx=require('@simtlix/gnx');
const Employees=require('../models/employees').Employees;

const {
    CantBeTwoEmployeesWithSameDNI,
    EmployeesMustBeOver18
} = require('../validators/employee.validator');

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
}=graphql;
const SexType=require('./enum/sexType');

const EmployeeType=new GraphQLObjectType({
    name:'Employee Type',
    description:'Represents Employees',
    extensions:{
        validations:{
            'CREATE':
            [
                CantBeTwoEmployeesWithSameDNI,
                EmployeesMustBeOver18
            ],
            'UPDATE':
            [
                CantBeTwoEmployeesWithSameDNI,
                EmployeesMustBeOver18
            ]
        }
    },
    fields:() => ({
        dni:GraphQLInt,
        birth_date:GraphQLString,
        first_name:GraphQLString,
        last_name:GraphQLString,
        gender:SexType,
        hire_date:GraphQLString
    })
});

gnx.connect(Employees,EmployeeType,'employee','employees');

module.exports=EmployeeType;
