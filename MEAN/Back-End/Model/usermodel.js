const mongoose  = require('mongoose');
// const bycrypt = require('bcryptjs');

const schema = mongoose.Schema
const UserSchema = new schema({
    fullname:String,
    username : String,
    email : String,
    mobile :String,
    password : String,
});

const  User = module.exports = mongoose.model('User',UserSchema);
