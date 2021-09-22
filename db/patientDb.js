const  connect      = require("../config/db");
const bcrypt        = require("bcrypt");

module.exports.registerPatient=(data)=>{
    return new Promise((resolve,reject)=>{
        try {
            connect.getConnection((err,connection)=>{
                  if(err){
                      reject(err);
                  }
                  else{
                    // const email = {'email':data.email}
                    const sql  = 'select * from users where email = '+connect.escape(data.email);
                    connection.query(sql,(err,dataa)=>{
                         if(err){
                             reject(err);
                         }
                         else if(dataa.length){
                             reject({message:"user already registered"});
                         }
                         else{
                             console.log("dsf");
                           bcrypt.genSalt(10,(err,salt)=>{
                              bcrypt.hash(data.password,salt,(err,hash)=>{
                                 data.password=hash;
                                 var users={
                                     'name'     : data.name,
                                     'email'    : data.email,
                                     'password' : data.password,
                                     'phno'     : data.phno,
                                     'address'  : data.address,
                                     'createdAt': new Date()
                                 }
                          let sql = "insert into users set ?";
                          connection.query(sql,[users],(err,regisData)=>{
                                   if(err){
                                       reject(err);
                                   }
                                   else{
                                       resolve(regisData.affectedRows);
                                   }
                                });  //insert ended      
                              });   // hashing ended
                           });     // bcrypt ended
                         }  // else ended
                         connection.release();
                    }); //connection ended 
                  }
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports.checkEmail=(email)=>{
    return new Promise((resolve,reject)=>{
        try {
            connect.getConnection((err,connection)=>{
                 if(err){
                     reject(err);
                 }
                 else{
                    var sql = 'select * from users where email='+connect.escape(email);
                    connection.query(sql,(err,data)=>{
                       if(err){
                           reject(err);
                       }
                       else{
                           resolve(data);
                       }
                    }); //query ended
                 }
             connection.release();
            }); //connection ended
        } catch (error) {
            reject(error);
        }
    });
}

module.exports.comparePassword=(pass,hash)=>{
 return new Promise((resolve,reject)=>{
     try {
         console.log(pass,hash);
      bcrypt.compare(pass,hash,(err,match)=>{
           if(err){
               reject(err);
           }
           else if(match){
               console.log("match",match);
               resolve(match);
           }
           else{
               reject({message:"email password didn't match"});
           }
      });    
     } catch (error) {
         reject(error);
     }
 });
}

module.exports.editPatientProfile=(id)=>{
    return new Promise((resolve,reject)=>{
       try {
           connect.getConnection((err,connection)=>{
              if(err){
                  reject(err);
              }
              else{
                  var sql = 'select * from users where userid='+connect.escape(id);
                  connection.query(sql,(err,data)=>{
                     if(err){
                         reject(err);
                     }
                     else if(data.length){
                          resolve(data);
                     }
                     else{
                         reject({message:"user not found"});
                     }
                  });
              }
              connection.release();
           }); //query ended
       } catch (error) {
           reject(error);
       }
    });
}

module.exports.updatePatientProfile=(data)=>{
    return new Promise((resolve,reject)=>{
        try {
         connect.getConnection((err,connection)=>{
             if(err){
                 reject(err);
             }
             else{
                 data.updatedAt = new Date();
connection.query('update users set name=?,address=?,email=?,phno=?,updatedAt=? where userid=?',
[data.name,data.address,data.email,data.phno,data.updatedAt,data.userid],(err,udata)=>{
         if(err){
             reject(err);
         }
         else if(udata.affectedRows>0){
             resolve(udata.affectedRows)
         }
         else{
            reject({message:"user profile not updated"});
               }
              });
             }
             connection.release();
          });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports.updateProfileStatus=(id)=>{
     return new Promise((resolve,reject)=>{
          try {
              connect.getConnection((err,connection)=>{
                  if(err){
                      reject(err);
                  }
                  else {
                //    let sql = "delete from user where userid="+connect.escape(id);
                   connection.query('update user set status=? where userid=?',['blocked',id],(err,data)=>{
                      if(err){
                          reject(err);
                      }
                      else if(data.affectedRows>0){
                           resolve(data.affectedRows);
                      }
                      else{
                         reject({message:"profile status not updated"});
                      }
                   });
                  }
                  connection.release();
              }); 
          } catch (error) {
              reject(error);
          }
     });
}

module.exports.showAllPaitent=(perPage,page)=>{
    return new Promise((resolve,reject)=>{
       try {

         page  = parseInt(page);
         perPage = parseInt(perPage); 
        //  var numPerPage = 5;
        let skip = (page-1) * perPage; 
        let limit = skip + ',' + perPage;
           let sql="select * from users order by userid LIMIT "+ limit;
           connect.getConnection((err,connection)=>{
                if(err){
                    reject(err);
                }
                else{
                 connection.query(sql,(err,data)=>{
                      if(err){
                          reject(err);
                      }
                      else{
                    let sql2 = "select count(*)as count from users";
                    connection.query(sql2,(err,count)=>{
                            if(err){
                                reject(err);
                            }
                            else{
                                console.log("count",count[0].count);
                                let da={
                                    data:data,
                                    count:count
                                }
                                resolve(da);
                            }
                       });
                      }
                    });   
                }
                connection.release();
           });    
       } catch (error) {
           reject(error);
       }
    });
}
