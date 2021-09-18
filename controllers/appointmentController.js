const appointmentDb  = require("../db/appointmentDb");

module.exports.booking=(req,res)=>{
    appointmentDb.booking(req.body)
    .then((data)=>{
        res.json({data:data,msg:"success"});
    })
    .catch((err)=>{
        res.json({error:err.message});
    })
}

module.exports.fetch=(req,res)=>{
    appointmentDb.fetchData(req.body)
    .then((data)=>{
        res.json({data:data,msg:"success"});
    })
    .catch((err)=>{
        res.json({error:err.message});
    })
}