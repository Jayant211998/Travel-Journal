const fs = require('fs')

const getdb = require('./database').getdb;

exports.addData=(req,res)=>{
    const db = getdb();
    return  (db.collection("destinations")
            .insertOne({   
            id:req.id,
            title:req.title,
            location:req.location,
            description:req.description,
            startDate:req.startDate,
            endDate:req.endDate,
            link:req.link,
            image:req.image,
            })
            .then(res=>{console.log(res)})
            .catch(err=>{console.log(err)}))
                                            
}

exports.getAllData=(req,res)=>{
    const db = getdb();
    return  (db.collection("destinations")
            .find()
            .toArray()
            .then(res=>{
                return res;
            })
            .catch(err =>{
                console.log(err)
                return err
            })
    )
}
exports.getDataById=(destid,res)=>{
    const db = getdb();
    return  (db.collection("destinations")
            .find({id:destid})
            .toArray()
            .then(res=>{
                return res;
            })
            .catch(err =>{
                console.log(err)
                return err
            })
    )
}

exports.upadateData=(destid,req,res)=>{
    const db = getdb();
    return  (db.collection("destinations")
            .updateOne(   
            {id:destid},
            {$set:{   
                id:req.id,
                title:req.title,
                location:req.location,
                description:req.description,
                startDate:req.startDate,
                endDate:req.endDate,
                link:req.link,
                image:req.image,
                }
            }
            )
            .then(res=>{console.log(res)})
            .catch(err=>{console.log(err)}))
                                            
}
exports.deleteData=(destId,res)=>{
    const db=getdb();
    return(db.collection('destinations')
    .deleteOne({id:destId})
    .then(res=>{console.log("Deleted")})
    .catch(err=>{console.log(err)}))
}

exports.addUser=(req,res)=>{
    const db = getdb();
    const formData = req;
    return  (db.collection(formData.auth)
            .insertOne({   
                auth:formData.auth,
                username:formData.username,
                name:formData.name,
                password:formData.password,
                key:formData.key
            })
            .then(res=>{console.log(res)})
            .catch(err=>{console.log(err)}))                                            
}

exports.getUser=(req,res)=>{
    const db = getdb();

    return  (db.collection(req.auth)
            .find({username:req.username,password:req.password,key:req.key})
            .toArray()
            .then(res=>{return res;})
            .catch(err=>{console.log(err)}))                                            
}
