const patientDb    = require("../db/patientDb");


module.exports.getRegister=(req,res)=>{
     res.render('dashboard/patient/register');
}

module.exports.getLogin=(req,res)=>{
    res.render('dashboard/patient/login');
}


module.exports.postRegister=(req,res)=>{
         try {
             console.log(req.body);
             patientDb.registerPatient(req.body)
             .then((data)=>{
                 res.json({data:"user registerd",msg:"success"})
             }) 
             .catch((err)=>{
                 res.json({error:err.message});
             })
         } catch (error) {
             reject(error);
         }
}

module.exports.postLogin=(req,res)=>{

       try {
           patientDb.checkEmail(req.body.email)
           .then((data)=>{
                if(data.length){
                   return patientDb.comparePassword(req.body.password,data[0].password)
                }
                else{
                    res.json({data:"user not registered",msg:"success"});
                }
           })
           .then((match)=>{
               console.log("ssf",match);
               if(match==true){
                res.json({data:"password matched",msg:"success"});
               }
               else{
                   res.json({data:"email password didn't matched",msg:"success"});
               }
           })
           .catch((err)=>{
               res.json({error:err.message});
           })
       } catch (error) {
           reject(error);
       }
}

module.exports.index=(req,res)=>{
       res.render('dashboard/patient/index');
}

module.exports.editPatientProfile=(req,res)=>{
        patientDb.editPatientProfile(req.params.id)
        .then((data)=>{
            res.json({data:data,msg:"success"});
        })
        .catch((err)=>{
            res.json({error:err.message});
        })
}

module.exports.updatePatientProfile=(req,res)=>{
     patientDb.updatePatientProfile(req.body)
     .then((data)=>{
         res.json({data:data,msg:"success"});
     })
     .catch((err)=>{
         res.json({error:err.message});
     })
}

module.exports.updatePatientStatus=(id)=>{
     patientDb.updateProfileStatus(id)
     .then((data)=>{
          res.json({data:data,msg:"success"}); 
     })
     .catch((err)=>{
         res.json({error:err.message});
     })
}