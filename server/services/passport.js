const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').Extract;

// we are using the jwt version that uses a strategy of checking a 
//user with a json web token jwt Passport has so many different strategies
//there are some for facebook, google, foursquare login some check directly for
//user name and password etc. 
//basically just functions that you pass args into

//first configure jwt with options

//set up options

const jwtOptions = {};

//create JWT strategy

//'payload below' is the decoded jwt token from authentication.js tokenForUser()

//function tokenForUser(user){
	//const timeStamp = new Date().getTime();
  //return jwt.encode({sub:user.id, iat:timeStamp},config.secret);
//}


const jwtLogin = new JwtStrategy(jwtOptions,function(payload,done){
	//we want to see if user id exist in our database
	//if it does call done with that user,
	//else call done without a user object

});

//tell passport to use strategy
