
//main set up imports use 'require' because of lack of es6 support
const express = require('express');
const morgan = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');


//DB set up

mongoose.connect('mongodb://localhost:auth/auth');


//asdf

//APP SET UP 


//middlewares are 
//below both morgan and bodyparser are middlewares.
//so any incoming request are going to be passed into them first!!!
// the 'use' on app.use is  'registering' the middlewares!!

//morgan is a logging framework used for logging all http request
//i use for debugging
app.use(morgan('combined'));

//body-parser is a middleware that parses any incoming request,I mean any, and parses for json
//'*/*' means any!!!

// app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json({type:'*/*'}));

router(app);

//SERVER Setup(connect with the world! 'web' )

//below is doing this: define port and if there is a designated port set up on
//the system already, use that. If not, use 3090
const port = process.env.PORT || 3090;

//Below is doing this: create an http server that knows how to recieve request and forward
//those request to app application
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port: ', port);



