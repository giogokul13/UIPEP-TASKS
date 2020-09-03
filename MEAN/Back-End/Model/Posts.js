const mongoose  = require('mongoose');
// const bycrypt = require('bcryptjs');

const schema = mongoose.Schema
const PostSchema = new schema({
    userid : String,
    user : String,
    time : Date,
    post : String,
    place : String
});

const  Post = module.exports = mongoose.model('Post',PostSchema);
