const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const salariesFields={
    empID:Schema.Types.ObjectId,
    salary:Number,
}

const salariesSchema=new Schema(salariesFields);

const Salaries=mongoose.model('Salaries',salariesSchema);
if(!Salaries.collection.collection){
    Salaries.createCollection();
}

module.exports={Salaries,salariesFields}