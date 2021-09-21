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
                                  "from": data.from,
                                   "to" : data.to,
                           "department" : data.department
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

module.exports.editDoctor=(id)=>{
        return new Promise((resolve,reject)=>{
             try {
                  connect.getConnection((err,connection)=>{
                       if(err){
                           reject(err);
                       }
                       else{
                        let sql = "select * from doctors where docid="+connect.escape(id)
                         connection.query(sql,(err,data)=>{
                                if(err){
                                    reject(err);
                                }
                                else if(data){
                                     resolve(data); 
                                }
                                else{
                                    reject({message:"data not found"});
                                }
                            });   
                        }
                     });
                  } catch (error) {
                   reject(error);
             }
        });
}

module.exports.updateStatus=(id)=>{
        return new Promise((req,res)=>{
             try {
               connect.getConnection((err,connection)=>{
                  if(err){
                      reject(err);
                  }
                  else{
                      let sql="update doctors set status=? where docid=?";
                      connection.query(sql,['unavailable',id],(err,data)=>{
                         if(err){
                             reject(err);
                         }
                         else if(data.affectedRows>0){
                            resolve(data.affectedRows);          
                         }
                         else{
                             reject({message:"status not updated"});
                         }
                      });
                  }
               });    
             } catch (error) {
                 reject(error);
             }
        }); 
}

module.exports.updateDoctorProfile=(data)=>{
        return new Promise((resolve,reject)=>{
            try {
                console.log(data);
                connect.getConnection((err,connection)=>{
                    if(err){
                    reject(err);
                    }
                    else{
                    let sql ='update doctors set name=?,qualification=?,phno=?,seefrom=?,seeto=?,department=? where docid=? '
                    connection.query(sql,[data.name,data.qualification,data.phno,data.seefrom,data.seeto,data.department,data.docid],(err,data)=>{
                        if(err){
                            reject(err);
                        }
                        else if(data.affectedRows>0){
                                resolve(data.affectedRows);
                        }
                        else{
                            reject({message:"profile not updated"});
                        }
                        connection.release();
                    });
                    }
                });   
            } catch (error) {
                reject(error);
            }       
        });
}