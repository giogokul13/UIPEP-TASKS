"use strict";

var mongoose = require('mongoose');

var NewPassword;

var bycrypt = require('bcryptjs');

var schema = mongoose.Schema;
var UserSchema = new schema({
  fullname: String,
  username: String,
  email: String,
  mobile: String,
  password: String
});
var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByUsername = function (username, callback) {
  User.findOne({
    username: username
  }, callback);
};

module.exports.addUser = function (newUser, callback) {
  bycrypt.genSalt(10, function (err, salt) {
    bycrypt.hash(newUser.password, salt, function (err, hash) {
      if (err) {
        console.log(" Error : " + err);
      }

      newUser.password = hash; // NewPassword  = hash

      newUser.save(callback);
    });
  });
};

module.exports.ComparePassword = function (password, hash, callback) {
  bycrypt.compare(password, hash, function (err, isMatch) {
    if (err) {
      return "Error : " + err;
    }

    callback(null, isMatch);
  });
};