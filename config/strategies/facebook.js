var passport = require('passport'),
    url = require('url'),
    FacebookStrategy = require('passport-facebook').Strategy,
    config = require('../config'),
    users = require('../../app/controllers/users.server.controller');

module.exports = function() {
    // register the strategy, creating an instance of FacebookStrategy object
  passport.use(new FacebookStrategy({ // Facebook application information
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    passReqToCallback: true
  },
  //callback when trying to authenticate a user
  //accessToken object to validate future requests
  //refreshToken object to grab new access tokens
  //profile object containing the user profile, and a done
  //callback to be called when the authentication process is over
  function(req, accessToken, refreshToken, profile, done) {
    var providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken;

//create a new user object using the Facebook profile information
    var providerUserProfile = {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      fullName: profile.displayName,
      email: ((profile.emails) ? profile.emails[0].value : ''),
      username: profile.profileUrl,
      provider: 'facebook',
      providerId: profile.id,
      providerData: providerData
    };

// authenticate the current user
    users.saveOAuthUserProfile(req, providerUserProfile, done);
  }));
};