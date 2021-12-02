const mysql=require('mysql')
var mySqlConnection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"12345678",
    database:"settings",
})

mySqlConnection.connect((err)=>{
    if(!err){
        console.log("Connected");
    }else{
        console.log(err);
    }
})

module.exports=mySqlConnection;