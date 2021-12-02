const express=require('express');
const cors=require('cors')
const app=express();
const Transaction=require("./models/transaction")
const Subscription=require("./models/subscription.js")
const port=process.env.PORT || 3000;

const db=require("./db/conn")
const mysqldb=require("./db/mysqlconn")

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({origin:'http://localhost:4200'}));

app.use(express.static('./frontend/dist'));

app.get("/api/settings/",(req,res)=>{
    mysqldb.query("select * from clients_settings where client_id=?",req.query.userid,(err,rows,fields)=>{
        if(!err){
            res.send(rows)
        }else{
            console.log(err);
        }
    })
})

app.get("/api/transaction",(req,res)=>{
    Transaction.find((err,doc)=>{
        if(err)console.log(err);
        else res.send(doc);
    })
})

app.post("/api/transaction",(req,res)=>{
    console.log(req.body)
    const transaction=new Transaction(req.body)
    transaction.save().then(()=>{
        res.send(transaction)
    }).catch((e)=>{
        res.send(e)
    })
})

app.get("/api/subscription",(req,res)=>{
    Subscription.find((err,doc)=>{
        if(err)console.log(err);
        else res.send(doc);
    })
})

app.post("/api/subscription",(req,res)=>{
    console.log(req.body)
    const subscription=new Subscription(req.body)
    subscription.save().then(()=>{
        res.send(subscription)
    }).catch((e)=>{
        res.send(e)
    })
})

// get request to get the details of clients 
app.get("/api/clients",(req,res)=>{
    mysqldb.query("Select * from clients",(err,rows,fields)=>{
        if(!err){
            res.send(rows)
        }else{
            console.log(err);
        }
    })
})

// to post the form data to mysql DB
app.post("/api/settings",(req,res)=>{

    // creating object to push into mysql db
    var postData  ={
        // put client id from the stored session/data
        "client_id":req.query.userid, 
        "enabled_rate":req.body.enabledRate,
        "rate":req.body.rate,
        "rate_interval":req.body.perSeconds,
        "enabled_quota":req.body.usageQuota,
        "quota":req.body.resetQuotaAfter,
        "quota_interval":req.body.maxRequestPerInterval
    };

    // added replace so that can insert or update based on criteria
    mysqldb.query('REPLACE INTO clients_settings SET ?', postData, function (error, results, fields) {
	  if (error) throw error;
	});
})

// get user settings
app.get("/api/clients-settings",(req,res)=>{
    mysqldb.query("Select * from clients_settings",(err,rows,fields)=>{
        if(!err){
            res.send(rows)
        }else{
            console.log(err);
        }
    })
})

app.listen(port,()=>{
    console.log("server started at PORT 3000");
})