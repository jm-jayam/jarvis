const User = require('../models/User');
const HttpStatus = require('http-status');
const {ReE,ReS,to,isNull,containsSpecialChars} = require('../services/util.service');
// var useragent = require('express-useragent');

module.exports.auth = async function(req, res){
    console.log(req.ip)
    
    let err,user;
    const {username,email,profile_picture} = req.body; 
    [err,user] = await to(User.findOne({email}));
    if(err) return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
    if(user) return ReE(res, 'Username already exists', HttpStatus.CONFLICT);
    [err,user] = await to(User.create(req.body));
    if(err) return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
    return ReS(res, {message:'User created successfully',user,token: user.getJWT()}, HttpStatus.OK);
}