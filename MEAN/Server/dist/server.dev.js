"use strict";

var express = require('express');

var bodyparser = require('body-parser');

var cors = require('cors');

var passport = require('passport');

var mongoose = require('mongoose');

var path = require('path');

var route = require('./Routes/routes');

var config = require('./config/database'); //const database = 'mongodb+srv://newuser:newuser@newcluster.4pqot.mongodb.net/NEW-DATABASE';


mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (err) {
  if (err) {
    console.log("Error : " + err);
  } else {
    console.log(" DataBase mongoDB is connected successfully");
  }
});
var app = express(); // use to handle diifernt frontend ports and work together

app.use(cors()); // used to get the form data body parser

app.use(bodyparser.json()); // passport initialize for token 

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/user', route);
app.get('/', function (req, res) {
  res.send("this is the home page of server");
});
app.listen(3000, function () {
  console.log("server running @ port 3000");
});