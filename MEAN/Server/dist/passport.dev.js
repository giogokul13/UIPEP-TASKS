"use strict";

var jwtstrategy = require('passport-jwt').Strategy;

var extractjwt = require('passport-jwt').ExtractJwt;

var config = require('./config/database');

var User = require('./Model/user');

module.exports = function (passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.SecretOrKey = config.secret;
  passport.use(new jwtstrategy(opts, function (payload, done) {
    User.getUserById(payload._id, function (err, user) {
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