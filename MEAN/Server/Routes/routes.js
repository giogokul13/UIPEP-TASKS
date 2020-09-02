const { hash } = require('bcryptjs');
const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const user = require('../Model/user');
const configKey = require('../config/database')
const User = require('../Model/user');
const { authenticate, session } = require('passport');
const { profile } = require('console');
const localStorage = require('node-localstorage')

router.post('/register',(req,res,next) =>{
   
    let newUser = new User({
        fullname : req.body.fullname,
        email : req.body.email,
        username : req.body.username,
        mobile :req.body.mobile,
        password : req.body.password
    });
    
    User.addUser(newUser,(err,user) =>{
        if(err){
           
        res.json({success : false , msg : "User Not Rgistered"});
        }
        else {
        res.json({success : true , msg : "User Rgistered Successfully"});
        }
    });

});

router.post('/authenticate',(req,res,next) =>{
    // res.send("authenticate");
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username,(err,user) =>{
        if(err){
            return "Error :" + err;
        }
        
        if(!user){
             res.json({success : false , msg : "User Not Found"});
        }
       User.ComparePassword(password,user.password,(err,isMatch) =>{
            if(err) {
                return "Error :" + err;
            }
            if(isMatch){
                const token = jwt.sign({user},configKey.SecretKey); //can also add expiresIn in object
                res.json({
                    success : true ,
                    msg : "Valid User",
                    token : 'jwt '+ token,
                    user : {
                        id : user.id,
                        fullname : user.fullname,
                        email : user.email,
                        mobile : user.mobile,
                        username :user.username

                    }
                });
                // res.json({
                //     success : true  ,
                //     token : token
                // })
            
            }
            else{
                res.json({
                    success : false,
                    msg : "wrong password"
                })
            }
        })

    })
})


// router.get('/profile',passport.authenticate('jwt',{session : false }),(req,res,next) =>{
//     res.json({user : req.user});
// })
//passport.authenticate('jwt')

router.get('/profile',verifytoken,(req,res)=>{
    jwt.verify(req.token,configKey.SecretKey,(err,user)=>{
        if(err){
            res.send("error 403 ").status(403);
        }
        else{
            res.json({
                message : "request successfully done",
                user
            });
        }
    });
});

function verifytoken(req,res,next){
    // const bearerheader  = req.headers['authorization'];
    // if(typeof bearerheader !== null){
    //     const bearer = bearerheader.split(' ');
    //     const btoken  = bearer[1];
    //     req.token = btoken;
    //       (); 
    // }
    // else{
    //     res.send("error occurred").status(500);
    // }
    get_token = localStorage.getItem(id_token);
    const jwt_token = get_token.split(' ');
    const btoken = jwt_token[1];
    req.token = btoken;
    next();
    
}

module.exports = router