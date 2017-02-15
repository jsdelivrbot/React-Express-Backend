//exported module will be imported into index.js of server
// will add functionality to router ie const router = require(./require) in index.js

//setting expected routes you want to handle with call back functions.
//three objects that will be passed in call back are req, res, next
//req of course is request object ie headers, body etc. res resopnse of course, and 
//next which will handle errors
module.exports = function(app){
	app.get('/',function(){;
    res.send(['einy','meany','miney','mo'])
	});

}
