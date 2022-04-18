const express = require('express')
const bodyParser = require('body-parser')
// const multer = require('multer')

const fs = require('fs')
const app = express();

const components = require('./components')
const mongoconnect = require('./database')

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.post('/addData',async(req,res,next)=>{
    const addData = await components.addData(req.body.data,res)
    return res.json({message:addData})
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
    return res.json({message:upadateData})
})
app.delete('/deleteData/:id',async(req,res,next)=>{
    const deleteData = await components.deleteData(req.params.id,res)
    return res.json({message:"deleted"})
})

mongoconnect.mongoConnect(()=>{
    app.listen(3001,()=>{console.log("Server Running at port 3001")})

}) 