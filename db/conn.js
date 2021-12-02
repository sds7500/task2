const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/transaction-api',(err)=>{
    if(!err){
        console.log("Connection Successful");
    }
    else{
        console.log(err);
    }
})

module.exports=mongoose;