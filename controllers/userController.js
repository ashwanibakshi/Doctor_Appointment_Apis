const { resolveInclude } = require("ejs");
const userDb    = require("../db/userDb");


module.exports.postRegister=(req,res)=>{
         try {
             console.log(req.body);
             userDb.registerUser(req.body)
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
           userDb.checkEmail(req.body.email)
           .then((data)=>{
                if(data.length){
                   return userDb.comparePassword(req.body.password,data[0].password)
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

module.exports.editUserProfile=(req,res)=>{
        userDb.editUserProfile(req.params.id)
        .then((data)=>{
            res.json({data:data,msg:"success"});
        })
        .catch((err)=>{
            res.json({error:err.message});
        })
}

module.exports.updateUserProfile=(req,res)=>{
     userDb.updateUserProfile(req.body)
     .then((data)=>{
         res.json({data:data,msg:"success"});
     })
     .catch((err)=>{
         res.json({error:err.message});
     })
}
