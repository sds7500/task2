const mongoose=require("mongoose");
const subscriptionSchema=new mongoose.Schema({
    account : {type:String},
    plan : {type:String},
    invoice :{type:String},
    start_duration:{type:String},
    end_duration:{type:String},
    status:{type:String}
})

const Subscription=new mongoose.model('Subscription',subscriptionSchema);

module.exports=Subscription;