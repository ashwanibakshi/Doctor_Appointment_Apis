const connect      = require("../config/db");

module.exports.addDoctor=(data)=>{
    return new Promise((resolve,reject)=>{
         try {
             connect.getConnection((err,connection)=>{
                 if(err){
                     reject(err);
                 }
                 else{
                     let sql = 'select * from doctors where email='+connect.escape(data.email);
                     connection.query(sql,(err,sdata)=>{
                         if(err){
                             reject(err);
                         }
                         else if(sdata.length){
                             reject({message:"already registered"});
                         }
                         else{
                             let doctor ={
                                 "name" : data.name,
                        "qualification" : data.qualification,
                                 "phno" : data.phno,
                                 "email": data.email,
                                "timing": data.timing 
                             }
                          let sql = "insert into doctors set?";
                          connection.query(sql,[doctor],(err,dataa)=>{
                                if(err){
                                    reject(err);
                                }
                                else if(dataa.affectedRows>0){
                                    resolve(dataa.affectedRows);
                                }
                                else{
                                    reject({message:"data not saved"});
                                }
                          });   
                         }
                     });
                 }
             });
         } catch (error) {
             reject(error);
         }
    });
}