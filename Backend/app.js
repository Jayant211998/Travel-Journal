const express = require('express')
const bodyParser = require('body-parser')
// const multer = require('multer')
const dotenv = require('dotenv'); 
var cors = require('cors');
const uuid = require('uuid');
const crypto = require("crypto");
const fs = require('fs')


const components = require('./components')
const mongoconnect = require('./database')


const app = express();
app.use(cors());
dotenv.config();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


const privateKey = "private_BDpLAeeg/iTxwkBBeAFOy8fWS1M=";
app.get("/auth", function(req, res) {
    var token = req.query.token || uuid.v4();
    var expire = req.query.expire || parseInt(Date.now()/1000)+2400;
    var privateAPIKey = `${privateKey}`;
    var signature = crypto.createHmac('sha1', privateAPIKey).update(token+expire).digest('hex');
    res.status(200);
    res.send({
        token : token,
        expire : expire,
        signature : signature
    });
});

app.post('/addData',async(req,res,next)=>{
    const addData = await components.addData(req.body.data,res)
     res.status(200).send({message:"Data Added"})
})
app.get('/getAllData',async(req,res,next)=>{
    try{const allData = await components.getAllData(req,res)
      res.status(200).send(allData)
    }
     catch(err){
        res.send(err)
     }
})
app.get('/getDataById/:id',async(req,res,next)=>{
    try{const dataById = await components.getDataById(req.params.id,res)
      res.status(200).send(dataById)
    }
     catch(err){
        res.send(err)
     }
})
app.post('/upadateData/:id',async(req,res,next)=>{
    const upadateData = await components.upadateData(req.params.id,req.body.data,res)
    res.status(200).send({message:upadateData})
})
app.delete('/deleteData/:id',async(req,res,next)=>{
    const deleteData = await components.deleteData(req.params.id,res)
    res.status(200).send({message:"deleted"})
})

app.post('/register',async(req,res)=>{
    const addUser = await components.addUser(req.body.data,res)
     res.status(200).send({message:"User Added"})
})
app.post('/login',async(req,res)=>{
    const getUser = await components.getUser(req.body.data,res)
    res.status(200).send(getUser)
})

mongoconnect.mongoConnect(()=>{
    app.listen(3001,()=>{console.log("Server Running at port 3001")})

})  