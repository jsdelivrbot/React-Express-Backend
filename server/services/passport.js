const passport = require('passport');
const User = require('../models/user');
//config is just the seceret being imported!!
const config = require('../config');
//JwtStrategy is to check if request has a token
const JwtStrategy = require('passport-jwt').Strategy;
//ExtractJwt is to tell passport where to start looking on header for token 
//ie authorization token
const ExtractJwt = require('passport-jwt').ExtractJwt;
//LocalStrategy is used to compare submitted against stored password
const LocalStrategy =require('passport-local');



//2.) strategy is a local strategy (data stored locally aka database)
//this is to authenticate initally from a email and password, before token below
//if email and password check, then they will be routed to recieve a token
//Create local strategy here

//passport will default to username and look for username and password automatically!!!
//we force passport to look at the email property instead of username, because thats what we are using instead
//password default can stay the same
const localOptions ={usernameFeild:'email'};
const localLogin = new LocalStrategy({localOptions},function(email,password,done){
	//LocalStrategy will parse request and pull out email and password

	//we need to verify the username and password and call done and pass user if 
	//user name and pass are correct
	//if not just call done if false
  User.findOne({email:email},function(err,user){
   if(err){return done(err);}
   if(!user){return done(null,false);}
  //compare password is == to user.password 	

   user.comparePassword(password,function(err,isMatch){
   	if(err){return done(err);}
   	if(!isMatch){return done(null,false);}
   	return done(null,user);

   });
  })


});







//below is 1.) strategy to check to see if user has a token
// we are using the jwt version that uses a strategy of checking a 
//user with a json web token jwt Passport has so many different strategies
//there are some for facebook, google, foursquare login some check directly for
//user name and password etc. 
//basically just functions that you pass args into

//first configure jwt with options

//set up options

const jwtOptions = {
	//whenever a request come in, look at requst header and finde header authorization property value
	//to find the token!!
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey:config.secret

};

//create JWT strategy

//'payload below' is the decoded jwt token from authentication.js tokenForUser()
//payload = {sub:user.id, iat:timeStamp}

//function tokenForUser(user){
	//const timeStamp = new Date().getTime();
  //return jwt.encode({sub:user.id, iat:timeStamp},config.secret);
//}

//jwtLogin is a tokened login. localLogin is just email and password.(The initial test)
const jwtLogin = new JwtStrategy(jwtOptions,function(payload,done){
	//we want to see if user id exist in our database
	//if it does call done with that user,
	//else call done without a user object
	User.findById(payload.sub,function(err,user){
		            
  //first arg err, second is user object which is false if no user found!!
  //This is for error in process of searching for user
    if(err){return (err,false);}
  //if user found call done and pass null for err first arg and user    
    if(user){
    	done(null,user);
   //below is an error for simply not finding a user unlike above process of searching
   //error 	
    }else{
    	done(err,false)
    }
	});

});



//tell passport to use strategy
passport.use(jwtLogin);
passport.use(localLogin);






