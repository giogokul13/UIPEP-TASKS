const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const route = require('./Routes/routes');
const config = require('./config/database');


 //const database = 'mongodb+srv://newuser:newuser@newcluster.4pqot.mongodb.net/NEW-DATABASE';

mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true},err =>{
    if(err){
        console.log( "Error : "+ err);
    }
    else{
        console.log(" DataBase mongoDB is connected successfully");
    }
})

const app = express();
// use to handle diifernt frontend ports and work together
app.use(cors());

// used to get the form data body parser
app.use(bodyparser.json());

// passport initialize for token 
// app.use(passport.initialize());
// app.use(passport.session());

require('./config/passport')(passport);


app.use('/user',route);

app.get('/',(req,res) =>{
    res.send("this is the home page of server");
})


app.listen(3000,() =>{
    console.log("server running @ port 3000")
})
