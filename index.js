const express=require('express');
const gnx=require('@simtlix/gnx');
const app=express();

const graphqlHTTP=require('express-graphql');

const mongoose=require('mongoose');
mongoose.plugin(require('./plugins/timePluginSchema'));

mongoose.connect('mongodb://localhost:27017,localhost:27018,localhost:27019/example', { replicaSet: 'rs' });

mongoose.connection.once('open',()=>{
    console.log("DB's up!");
});

const types=require('./types');
const includedTypes=Object.values(types);
const schema=gnx.createSchema(includedTypes,includedTypes);

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(3000,()=>{
    console.log("App's listening on port 3000!");
});