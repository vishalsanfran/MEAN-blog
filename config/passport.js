var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function() {
  var User = mongoose.model('User');
  
  //after user is authenticated, Passport will save its _id
  // property to the session.
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

// use the _id property to grab the user object from the database
  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
      //make sure Mongoose doesn't fetch the user's password and salt properties
    }, '-password -salt', function(err, user) {
      done(err, user);
    });
  });

//including the local strategy configuration file. Then server.js 
// will load the Passport configuration file, which in turn will load
// its strategies configuration file
  require('./strategies/local.js')();
  require('./strategies/facebook.js')();
  require('./strategies/twitter.js')();
  require('./strategies/google.js')();
};