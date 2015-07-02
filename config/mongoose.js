var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
  //connect to MongoDB isntance using db property of configuration object
  var db = mongoose.connect(config.db);

  // register the user, article model
  require('../app/models/user.server.model');
  require('../app/models/article.server.model');
  
  return db;
};