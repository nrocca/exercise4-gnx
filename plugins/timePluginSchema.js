const graphql=require('graphql');
const {GraphQLString}=graphql;

module.exports=function(schema,options){
    schema.add({from_date:{type:GraphQLString}});
    schema.add({to_date:{type:GraphQLString}});
}