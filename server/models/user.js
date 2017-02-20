const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//define model 
const userSchema = new Schema({
 email:{type:String,unique:true,lowercase:true},
 password:String

});

//On save hook, encrypt password
//Before saving this model, run this function saving is going on in 
//authentication.js module
userSchema.pre('save',function(next){
	//gettng scope level(function level) access to user model!!!
	//meaning 'user' is now an instance of userSchema model inside this function!!
	//it is a very specific ie user.password would console.log 'jerryb@gmail.com' instance specific 
	const user = this;

	//generate a salt, then run callback. It takes some time to salt so use
	// a call back
	bcrypt.genSalt(10, function(err,salt){
		if(err){return next(err);}
	
	// now hash (encrypt) the password using this salt(hash)	
	bcrypt.hash(user.password,salt,null, function(err,hash){
      if(err){return next(err);}
      
  //over write plain text with encrypted here
  user.password = hash;
  //next() means,since this is a presave hook 'UserScheme.pre' we can save model
  //user.save inside the call back found in authentication.js
        next();
		});
	});

});
 
//create model class'
//load schema(adding userScema model) into mongoose under the collection 'user'
//ModelClass represents all users and is the class definiton

const ModelClass = mongoose.model('user',userSchema);


//export model
module.exports = ModelClass;
