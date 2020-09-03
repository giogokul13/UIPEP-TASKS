const express = require('express');
const app = express();
const route = require('./Route/routes');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const cors = require('cors');
dotenv.config();

mongoose.connect( process.env.DATA_BASE,{useNewUrlParser: true, useUnifiedTopology: true},err =>{
    if(err){
        console.log("Error Occured when connecting to database..");
        throw err;
    }
    else{
        console.log("MongoDB DataBase is Connected Successfully !!!..");
    }
})
app.use(cors());
app.use(bodyparser.json());

app.use(express.json());

app.use('/user',route);
app.get('/',(req,res) =>{
    res.send("this is the home page of server");
})

app.listen(5000,function(){
    console.log("server running @ port 5000");
})