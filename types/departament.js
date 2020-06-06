const graphql=require('graphql');
const gnx=require('@simtlix/gnx');
const Departaments=require('../models/departments').Departaments;

const { CantRepeatName }=require('../validators/departament.validator');

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString
}=graphql;

const DepartamentType=new GraphQLObjectType({
    name:'DepartamentType',
    description:'Represents Departaments',
    extensions:{
        validations:{
            'CREATE':
            [
                CantRepeatName
            ],
            'UPDATE':
            [
                CantRepeatName
            ]
        }
    },
    fields:()=>({
        dept_name:{type:GraphQLString}
    })
});

gnx.connect(Departaments,DepartamentType,'departament','departaments');

module.exports=DepartamentType;