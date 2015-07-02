// used the Mongoose module to call the model method that 
// will return the User model
var User = require('mongoose').model('User'),
  passport = require('passport');

// private method
var getErrorMessage = function(err) {
  var message = '';

//MongoDB indexing error handled using the error code
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        message = 'Something went wrong';
    }
    // Mongoose validation error handled using the err.errors object
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  return message;
};

exports.renderSignin = function(req, res, next) {
  if (!req.user) {
    res.render('signin', {
      title: 'Sign-in Form',
      messages: req.flash('error') || req.flash('info')
    });
  } else {
    return res.redirect('/');
  }
};
exports.renderSignup = function(req, res, next) {
  if (!req.user) {
    res.render('signup', {
      title: 'Sign-up Form',
      messages: req.flash('error') // store temporary msgs in session
    });
  } else {
    return res.redirect('/');
  }
};

//uses your User model to create new users
exports.signup = function(req, res, next) {
  if (!req.user) {
    //creates a user object from the HTTP request body
    var user = new User(req.body);
    var message = null;

    user.provider = 'local';

    //try to save it to MongoDB
    user.save(function(err) {
      if (err) {
        var message = getErrorMessage(err);

        req.flash('error', message);
        return res.redirect('/signup');
      }
      // user creation was successful, the user session will be 
      //created using the req.login() method
      req.login(user, function(err) {
        if (err) return next(err);
        return res.redirect('/');
      });
    });
  } else {
    return res.redirect('/');
  }
};

exports.signout = function(req, res) {
  req.logout();
  res.redirect('/');
};

// accepts a OAuth user profile, and then looks for an existing user
//with these providerId and provider
exports.saveOAuthUserProfile = function(req, profile, done) {
  User.findOne({
    provider: profile.provider,
    providerId: profile.providerId
  }, function(err, user) {
    if (err) {
      return done(err);
    } else {
      if (!user) {
        var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');

        User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
          profile.username = availableUsername;

          user = new User(profile);

          user.save(function(err) {
            /*if (err) {
              var message = this.getErrorMessage(err);

              req.flash('error', message);
              return res.redirect('/signup');
            }*/

            return done(err, user);
          });
        });
      } else {
        //found the user
        return done(err, user);
      }
    }
  });
};

// authentication middleware
exports.requiresLogin = function(req, res, next) {
  // uses the Passport initiated req.isAuthenticated() method to check 
  //whether a user is currently authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      message: 'User is not logged in'
    });
  }

  next();
};

//CRUD methods
exports.create = function(req, res, next) {
  // 'new' keyword is used to create a new model instance
  // the instance is populated by the request body
  var user = new User(req.body);

  user.save(function(err) {
    if (err) {
      // pass the error to the next middleware
      return next(err);
    } else {
      // save the user to the DB and output the JSON user object
      res.json(user);
    }
  });
};

exports.list = function(req, res, next) {
  // find() parameters: 1. MongoDB query object, 2. callback function
  User.find({}, function(err, users) {
    if (err) {
      return next(err);
    } else {
      res.json(users);
    }
  });
};

exports.read = function(req, res) {
  res.json(req.user);
};

exports.userByID = function(req, res, next, id) {
  User.findOne({
    _id: id
  }, function(err, user) {
    if (err) {
      return next(err);
    } else {
      req.user = user;
      next();
    }
  });
};

//find by Id and update. req.user is already populated
exports.update = function(req, res, next) {
  User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
    if (err) {
      return next(err);
    } else {
      res.json(user);
    }
  });
};

exports.delete = function(req, res, next) {
  req.user.remove(function(err) {
    if (err) {
      return next(err);
    } else {
      res.json(req.user);
    }
  })
};