const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport')




//creating middleware that authenticates before hitting the route
//it is told to use 'jwt' strategy and not to make a cookie based session!! By default
//passport makes a cookie based session
//we make it false because we are using TOKENS!!!! instead of sessions
//require auth is an interceptor a middleware!!!
const requireAuth = passport.authenticate('jwt',{session:false});


const requireSignin = passport.authenticate('local',{session:false});
                      
//exported module will be imported into index.js of server
// will add functionality to router ie const router = require(./require) in index.js

//setting expected routes you want to handle with call back functions.
//three objects that will be passed in call back are req, res, next
//req of course is request object ie headers, body etc. res resopnse of course, and 
//next which will handle errors
module.exports = function(app){
 app.post('/signup',Authentication.signup);

 app.post('/signin',requireSignin,Authentication.signup)
 
//first go to root '/', then redirect to require auth, then go to route
 app.get('/',requireAuth,function(req,res){
   res.send({hi:'there'});
 });


 

}
