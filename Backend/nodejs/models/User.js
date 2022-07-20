const mongoose = require('mongoose');
const CONFIG = require('../config/config')
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    username : {
        type : String,
        Default : 'User'
    },
    email : {
        type :String,
        required : true,
    },
    profile_picture : {
        type :String,
    }

},{timestamps : true});

userSchema.methods.getJWT = () =>{
    let expiration_time = parseInt(CONFIG.jwt_expiration) ;
    return ("Bearer "+jwt.sign({
      user_id: this._id,
      authId: this.authId
    },
    CONFIG.jwt_secret, {
      expiresIn: expiration_time,
      }));
}

const User = mongoose.model('user', userSchema);
module.exports = User;