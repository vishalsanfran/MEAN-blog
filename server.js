process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Make sure that your Mongoose configuration file is loaded 
// before any other configuration to utilize the User model
var mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport');
    
var db = mongoose();
var app = express(db);
var passport = passport();

app.listen(process.env.PORT);
module.exports = app;

console.log('Server running at ' + process.env.IP + ':' + process.env.PORT);
