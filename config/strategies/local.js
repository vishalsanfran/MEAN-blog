var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function() {
  //register with a local strategy    
  passport.use(new LocalStrategy(function(username, password, done) {
    // find a user with that username  
    User.findOne({
      username: username
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      
      // 'done' callback is called when authentication is finished
      if (!user) {
        return done(null, false, {
          message: 'Unknown user'
        });
      }
      if (!user.authenticate(password)) {
        return done(null, false, {
          message: 'Invalid password'
        });
      }
      
      return done(null, user);
      });
  }));
};