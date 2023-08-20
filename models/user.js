const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
        validate:{
            validator:validator.isEmail,
            message:'Please provide valid email'
        }
        
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


userSchema.pre('save', async function() {
    if(!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.comparePassword = async function(condidatePassword) {
    const isMatch = await bcrypt.compare(condidatePassword, this.password);
    return isMatch;
}


const User = mongoose.model('User', userSchema);
module.exports = User;