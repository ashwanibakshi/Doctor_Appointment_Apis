const connect   = require("../config/db");


module.exports.booking=(data)=>{
    return new Promise((resolve,reject)=>{
         try {
           connect.getConnection((err,connection)=>{
                if(err){
                    reject(err);
                } 
                else{
                    let booking={
                       docid : parseInt(data.docid),
                      userid : parseInt(data.userid),
                        date : data.date,
                    slottime : data.slot
                    }
                 let sql ="insert into appointment set?";
                 connection.query(sql,[booking],(err,dataa)=>{
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
         } catch (error) {
             reject(error);
         }
    });
}

module.exports.fetchData=(date)=>{
    return new Promise((resolve,reject)=>{
       try {
           connect.getConnection((err,connection)=>{
               if(err){
                   reject(err);
               }
               else{
                   let sql = "select * from appointment where date="+connect.escape(date);
                   connect.query(sql,(err,dataa)=>{
                       if(err){
                           reject(err);
                       }
                       else if(dataa.length){
                           resolve(dataa);
                       }
                       else{
                           reject({message:"no data found"});
                       }
                   });
               }
           });
       } catch (error) {
           reject(error);
       }
    });
}