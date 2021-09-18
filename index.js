const express     = require("express");
const mysql       = require("mysql");
const connect     = require("./config/db");

const app    = express();

//connect to server
connect.getConnection((err)=>{
    if(err){
        console.log(err);
        connect.end();
    }
    else{
    console.log('connect to server');
    }
})

//tempate engine
app.set("view engine","ejs");

//fetch data from the coming request
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//default page
app.get('/',(req,res)=>{
      res.render("home/index");
});

//routes
app.use('/api/v1/',require("./routes/routes"));

// port
const port  = process.env.PORT || 3000;

app.listen(port,()=>console.log('server run at port '+port));