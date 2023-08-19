const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'most privide name'],
        minLength:3,
        maxLength:20
    },
    email:{
        type:String,
        required:[true, 'most provide email'],
        unique:true,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please provide valid email']
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        maxLength:12
    },
    role:{
        type:String,
        enum:['admin', 'user'],
        default:'user'
    }
}, {timestamps:true});


const User = mongoose.model('User', userSchema);
module.exports = User;