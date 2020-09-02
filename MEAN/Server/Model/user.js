const mongoose  = require('mongoose');
var NewPassword ;
const bycrypt = require('bcryptjs');

const schema = mongoose.Schema
const UserSchema = new schema({
    fullname:String,
    username : String,
    email : String,
    mobile :String,
    password : String,
});

const  User = module.exports = mongoose.model('User',UserSchema);

module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
}
module.exports.getUserByUsername = function(username,callback){
    User.findOne({username : username},callback);
}


module.exports.addUser = function(newUser,callback){
    bycrypt.genSalt(10,(err,salt) =>{
        bycrypt.hash(newUser.password,salt,(err,hash) =>{
            if(err){
                console.log(" Error : " +err);
            }
            newUser.password = hash;
            // NewPassword  = hash
            newUser.save(callback);

})
})
}

module.exports.ComparePassword = function(password,hash,callback){
    bycrypt.compare(password,hash,(err,isMatch) =>{
        if(err){    return "Error : " + err } 
        callback(null,isMatch);
    });
}

        