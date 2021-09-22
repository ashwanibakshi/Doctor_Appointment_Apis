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

module.exports.editDoctor=(req,res)=>{
     doctorDb.editDoctor(req.params.id)
     .then((data)=>{
          res.json({data:data,msg:"success"});
     })
     .catch((err)=>{
          res.json({error:err.message});
     })
}

module.exports.updateStatus=(req,res)=>{
     doctorDb.updateStatus(req.params.id)
     .then((data)=>{
          res.json({data:data,msg:"success"});
     })
     .catch((err)=>{
          res.json({error:err.message});
     })
}

module.exports.updateProfile=(req,res)=>{
     doctorDb.updateDoctorProfile(req.body)
     .then((data)=>{
          res.json({data:data,msg:"success"});    
     }) 
     .catch((err)=>{
          res.json({error:err.message}); 
     })
}

module.exports.showAllDoctors=(req,res)=>{
      let perpage=5,page=1;
     if(req.query.page){
          page = req.query.page;   
     }
     if(req.query.perpage){
         perpage = req.query.perpage;
     }
     doctorDb.showAllDoctors(perpage,page)
     .then((data)=>{
         res.json({
              data : data.data,
           current : page,
             pages : Math.ceil(data.count[0].count/perpage)
         });
     })
     .catch((err)=>{
          res.json({error:err.message}); 
     })
}