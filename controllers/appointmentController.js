const appointmentDb  = require("../db/appointmentDb");

module.exports.bookingPage=(req,res)=>{
    res.render("dashboard/patient/booking");
}

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

module.exports.patientBookingHistory=(req,res)=>{
    let perpage=5,page=1;
    if(req.query.perpage){
        perpage = req.query.perpage;
    }
    if(req.query.page){
       page = req.query.page;
    }
    appointmentDb.bookingHistory(perpage,page,req.params.id)
    .then((data)=>{
        res.json({data:data,msg:"success"});
    })
    .catch((err)=>{
        res.json({error:err.message});
    })
}