"use strict";

var jwtstrategy = require('passport-jwt').Strategy;

var extractjwt = require('passport-jwt').ExtractJwt;

var configkey = require('./database'); // const  config  = require('dotenv/types').config();


var User = require('../Model/user');

require('dotenv').config();

var jwtOptions = {
  jwtFromRequest: extractjwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: configkey.SecretKey
}; //console.log(jwt_payload);

module.exports = function (passport) {
  passport.use(new jwtstrategy(jwtOptions, function (jwt_payload, done) {
    // console.log(jwt_payload);
    User.findOne(jwt_payload._id, function (err, user) {
      if (err) {
        return done(err, false);
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
};