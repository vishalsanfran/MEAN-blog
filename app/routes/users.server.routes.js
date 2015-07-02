var users = require('../../app/controllers/users.server.controller'),
    passport = require('passport');

module.exports = function(app) {
  app.route('/signup')
     .get(users.renderSignup)
     .post(users.signup);

  app.route('/signin')
     .get(users.renderSignin)
     .post(passport.authenticate('local', {
       successRedirect: '/', //redirect here to successful auth
       failureRedirect: '/signin', //otherwise..
       failureFlash: true //use flash msgs
     }));

  app.get('/signout', users.signout);
  
  //start the user authentication process
  app.get('/oauth/facebook', passport.authenticate('facebook', {
    failureRedirect: '/signin'
    }));

//use the passport.authenticate() method to finish the authentication
//process once the user has linked their Facebook profile
  app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/signin',
    successRedirect: '/'
    }));
  
  app.get('/oauth/twitter', passport.authenticate('twitter', {
    failureRedirect: '/signin'
    }));

  app.get('/oauth/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: '/signin',
    successRedirect: '/'
    }));
  
  app.get('/oauth/google', passport.authenticate('google', {
    failureRedirect: '/signin',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ],
  }));

  app.get('/oauth/google/callback', passport.authenticate('google', {
    failureRedirect: '/signin',
    successRedirect: '/'
  }));
  
  // legacy routes
  app.route('/users')
  .post(users.create)
  .get(users.list);
  
  //:userId is a request param
  app.route('/users/:userId')
     .get(users.read)
     .put(users.update)
     .delete(users.delete);

  app.param('userId', users.userByID);
};