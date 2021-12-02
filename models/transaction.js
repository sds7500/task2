const mongoose=require("mongoose");
const transactionSchema=new mongoose.Schema({
    account : {type:String},
    description : {type:String},
    invoice:{type:String},
    created_Date:{type:String},
    status:{type:String}
})

const Transaction=new mongoose.model('Transaction',transactionSchema);

module.exports=Transaction;