const jwtstrategy = require('passport-jwt').Strategy;
const extractjwt = require('passport-jwt').ExtractJwt;
const configkey = require('./database');
// const  config  = require('dotenv/types').config();

const User = require ('../Model/user');
require('dotenv').config();
    let jwtOptions = {
        jwtFromRequest: extractjwt.fromAuthHeaderWithScheme('jwt')
        ,
        secretOrKey: configkey.SecretKey
    };
//console.log(jwt_payload);
module.exports = function(passport){
    
    passport.use(new jwtstrategy(jwtOptions,(jwt_payload,done) =>{
        // console.log(jwt_payload);
        User.findOne(jwt_payload._id, (err,user) =>{
        
            if(err){
                return done(err ,false);
            }
            if(user){
                return done(null , user);
            }
            else{
                return done(null , false);
            }
        })
    }
    ))
}