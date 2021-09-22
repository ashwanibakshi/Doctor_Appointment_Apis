const connect   = require("../config/db");


module.exports.booking=(data)=>{
    return new Promise((resolve,reject)=>{
         try {
           connect.getConnection((err,connection)=>{
                if(err){
                    reject(err);
                } 
                else{
                    console.log("sdfsf",data);
                    let booking={
                       docid : parseInt(data.docid),
                      userid : parseInt(data.userid),
                        date : data.date,
                    slottime : data.slot
                    }
                    console.log('booking',booking);
                 let sql ="insert into appointment set?";
                 connection.query(sql,[booking],(err,dataa)=>{
                     if(err){
                         reject(err);
                     }
                     else if(dataa.affectedRows>0){
                         console.log(dataa)
                         let sql='select * from appointment where date='+connect
                          resolve(dataa.affectedRows);
                     }
                     else{
                         console.log(dataa);
                         reject({message:"data not saved"});
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

module.exports.fetchData=(data)=>{
    return new Promise((resolve,reject)=>{
       try {
           connect.getConnection((err,connection)=>{
               if(err){
                   reject(err);
               }
               else{
                   console.log(data);
                   let sql = "select slottime from appointment where date="+connect.escape(data.date)+"order by slottime ASC" ;
                   connect.query(sql,(err,dataa)=>{
                       if(err){
                           reject(err);
                       }
                       else if(dataa){
                           resolve(dataa);
                       }
                       else{
                           reject({message:"no data found"});
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

module.exports.bookingHistory=(perPage,page,id)=>{
    return new Promise((resolve,reject)=>{
         try {
             connect.getConnection((err,connection)=>{
                 if(err){
                     reject(err);
                 }
                 else{
                    page  = parseInt(page);
                    perPage = parseInt(perPage); 
                   let skip = (page-1) * perPage; 
                   let limit = skip + ',' + perPage;
        let sql="select appointment.userid,appointment.docid,appointment.date,appointment.slottime from appointment INNER JOIN users on appointment.userid = users.userid where appointment.userid=  order by userid LIMIT "+connect.escape(id,limit);
                    connection.query(sql,(err,data)=>{
                       if(err){
                           reject(err);
                       } 
                       else{
                           resolve(data);
                       }
                    });
                 }
                connection.release();
             }) 
         } catch (error) {
             reject(error);
         }
    });
}