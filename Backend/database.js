const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient

let _db;
const mongoConnect=(callBack)=>{
    MongoClient.connect('mongodb+srv://Jayant:Jayant*123@cluster0.rathj.mongodb.net/travelJournal?retryWrites=true&w=majority')
    .then(client=>{
        console.log("Connected")
        _db=client.db();
        callBack()
    })
    .catch(err=>{
        console.log(err)
        throw err;
    })
}

const getdb = () => {
    if(_db){
        return _db;
    }
    else{
        throw "No database found";
    }
}

exports.mongoConnect = mongoConnect;
exports.getdb = getdb;

