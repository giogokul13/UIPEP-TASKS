const router = require('express').Router() ;
const UserModel = require('../Model/usermodel');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('../verifytoken');
const PostModel = require('../Model/Posts');
const Post = require('../Model/Posts');
const user = require('../Model/usermodel');

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
    if(req.body.place === undefined){
        res.json({ success : false , msg : " Place should not be empty"});
        return false;
    }

    const Post = new PostModel({
        userid : req.user._id,
        user : req.user.username,
        time : Date.now(),
        post : req.body.post,
        place : req.body.place,
    });
    Post.save();
    res.status(200);
    res.json({
        success : true ,
        msg : "Post submitted Successfully !!..",
        Post
    });
});

router.get('/dashboard',verify,(req,res) =>{
    // res.send("dashboard appears perfectly when you are logged in");
    PostModel.find({}).exec((err,data) =>{
        if(err) { console.log(err);}
        else { 
            res.send({data})};
    });
});

//like

router.put('/like',verify,(req,res) =>{
    PostModel.findOne( { _id : req.body._id} ,(err , post ) =>{
        if(err){
             res.json({success : false , msg : "invalid post id"});
            }
            else{
                if(!post){
                    res.json({ success : false , msg : "Post not found"});
                }
                else{
                    if(PostModel.likedBy.includes(user.username)){
                        res.json({ success : false , msg : "you have already liked"});
                    }
                    else{
                        post.likes++ ;
                        post.likedBy.push(user.username);
                        post.save((err)=>{
                            if(err){
                                res.json({ success : false , msg : "something went wrong " });
                            }
                            else{
                                res.json({ success : true , msg : " Blog liked"});
                            }
                        });
                    }
            }
            }
    });
});

// comment 

router.post('/comment',verify,(req,res) =>{
    if(!req.body.comment){
        res.json({ success : false , msg : " no Commnet provided"});
    }
    else{
        if(!req.body._id){
            res.json({ success : false , msg : " no id was provided"});
        }
        else{
            Post.findOne( { _id : req.body._id} , (err ,post) =>{
                if(err){
                    res.json({ success : false , msg : "no id found /matched"});
                }
                else{
                    if(!post){
                        res.json({ success : false , msg : "no post avilable"});
                    }
                    user.findOne( { _id : req.decoded.userid} , (err , user) =>{
                        if(err){
                            res.json({ success : false , msg : "something went wrong"});
                        }
                        else{
                            if(!user){
                                res.json({ success : false , msg : " User not found "});
                            }
                            else{
                                post.comments.push({
                                    comment : req.body.comment,
                                    commentator : user.username
                                });
                                post.save((err) =>{
                                    if (err) {
                                        res.json({ success : false , msg : "something went wrong."});
                                    }
                                    else{
                                        res.json({ success : true , msg : "comment saved successfully.."});
                                    }
                                })
                            }

                        }
                    });
                }
            });
        }
    }
});




module.exports = router;