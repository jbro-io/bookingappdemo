'use strict';
//================================================================================
// Libraries
//================================================================================
var express            = require('express');
//express middleware
var compress           = require('compression');
var bodyParser         = require('body-parser');
var methodOverride     = require('method-override');
var serveStatic        = require('serve-static');
var logger             = require('morgan');
var errorHandler       = require('errorhandler');
var responseTime       = require('response-time');
var session            = require('express-session');
var cookieParser       = require('cookie-parser');
//other middleware
var path               = require('path');
var passport           = require('passport');
var cors               = require('./server/cors');
var globalErrorHandler = require('./server/error');
//routers
var routers            = require('./server/routers');

//================================================================================
// Properties
//================================================================================
var app  = express();
var port = process.env.PORT || 7000;

//================================================================================
// Configuration
//================================================================================
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV === 'development') {
    console.log('!! DEVELOPMENT MODE !!');
} else if(process.env.NODE_ENV === 'production') {
    console.log('!! PRODUCTION MODE !!');
}

//================================================================================
// Middleware
//================================================================================
app.use(logger('dev'));
app.use(errorHandler({ dumpExceptions: true, showStack: true }));
app.use(responseTime());
app.use(cookieParser());
app.use(session({secret: 'mysecret', key:'sid', cookie: { maxAge: 60000 }}));
// app.use(cors());                                         //CORS implementation
app.use(compress());                                     //Compress response data with gzip / deflate. This middleware should be placed "high" within the stack to ensure all responses may be compressed.
app.use(bodyParser());                                   //Request body parsing middleware supporting JSON, urlencoded, and multipart requests. This middleware is simply a wrapper for the json(), urlencoded(), and multipart() middleware.
app.use(methodOverride());                               //Faux HTTP method support. Use if you want to simulate DELETE/PUT
app.use(serveStatic(path.join(__dirname, 'client')));    //serve up static files (html, js, css, etc.)
app.use(passport.initialize());                          //initializes passport                                    //application routes
app.use(globalErrorHandler);                             //handles all unresolved errors from the next() method

//================================================================================
// Initialization
//================================================================================
//mount all our routes to the appropriate path
app.use('/auth', routers.auth);
app.use('/google', routers.google);

app.listen(port, function() {
  console.log('Listening on ' + port);
});