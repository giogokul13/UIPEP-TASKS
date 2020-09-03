const router = require('express').Router() ;
const UserModel = require('../Model/usermodel');
const bycrypt = require('bcryptjs');
const User = require('../../Server/Model/user');
const jwt = require('jsonwebtoken');
const verify = require('../verifytoken');
const { json } = require('body-parser');
const PostModel = require('../Model/Posts');
const user = require('../../Server/Model/user');

// register  api

router.post('/register',async(req,res) =>{

    const usernameExists = await UserModel.findOne({username : req.body.username});
    const emailExists = await UserModel.findOne({email :req.body.email});
    if(usernameExists) {
        res.json({success : false , msg : "Username Already exists"});
        return false
    }
    if(emailExists) {
        res.status(400).json({success : false , msg : "Email Already exists"});
        return false
    }

    else{
        const salt = await bycrypt.genSalt(10);
        const hashedpassword = await bycrypt.hash(req.body.password,salt);

    const User = new UserModel({
        fullname : req.body.fullname,
        username : req.body.username,
        email : req.body.email,
        mobile : req.body.mobile,
        password : hashedpassword
    });
    try{
     const user = await User.save();
     res.status(200);
     res.json({success : "true", msg : "User Registered Successfully!!",user} ); 
    }
    catch(err){
        res.send(err);
        
    }
    }
});

// login api

router.post('/authenticate', async (req,res) =>{
    const user = await UserModel.findOne({username : req.body.username});
    if(!user) {
        res.json({success : false , msg : "Username doesnot exists in the data base"});
        return false
    }
    const validPass = await bycrypt.compare(req.body.password,user.password);
    if(!validPass){
        return res.status(401).json({
        success : false , msg : "invalid password"});
    }
     const payload = {
         _id : user._id,
         fullname : user.fullname,
         email : user.email,
         mobile : user.mobile,
         username : user.username,
         //password : user.password     
     }
    // create a token 
    const token = jwt.sign(payload , process.env.SECRET_KEY);
    res.header('Authorization', token);


    res.json({success : true,
             msg : " Logged In successfully !!!",
             user : user ,
             token : token
});
        // res.json({token});
});

// profile 
router.get('/profile',verify,(req,res) => {
    // res.send(" profile is accessible");
    // res.send(req.user);
    // let user = User.findOne({_id : req.user});
    // res.send(user);
    res.send(req.user);
})

router.post('/post',verify,(req,res) =>{
    const post = req.body.post
    if(post === undefined){
        res.json({ success : false , msg : " Post should not be empty"});
        return false;
    }

    const Post = new PostModel({
        user : user.username,
        time : Date.now(),
        post : req.body.post,
        place : req.body.place
    });

})

module.exports = router;