const doctorDb      = require("../db/doctorDb");

module.exports.addDoctor=(req,res)=>{
  doctorDb.addDoctor(req.body)
  .then((data)=>{
       res.json({data:data,msg:"success"});
  })
  .catch((err)=>{
       res.json({error:err.message});
  })
}