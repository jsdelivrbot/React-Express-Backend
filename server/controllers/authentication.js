//my database
const User = require('../models/user');

//User being the total class of all users not just one
exports.signup = function(req,res,next){
  
const email = req.body.email;
const password = req.body.password;
//validate to make sure a password and email are submitted
if(!email || !password){
	return res.status(422).send({error:'You must provide email and password'})
}
  
//see if a user with specific given email exist

User.findOne({email:email},function(err,existingUser){
	
//handle if database connection throws error
  if(err){return next(err); } 
  
//if user does exist, return an error 422 status. '422' sets http code on response
// to unprocessable entity basically data supplied was bad and not
//processable!!
  if(existingUser){
  	return res.status(422).send({error:'Email is in use'});
  }

//if user doesnot exist , create and save user record and respond to request

//create a new user
const user = new User({
	email:email,
	password:password
});

//save a new user // also put in call back checking for error if not return 
//with a json success confirmation
user.save(function(err){
 if(err){return next(err)}
 	res.json({success:true})
 });
});

  //that user was created
}