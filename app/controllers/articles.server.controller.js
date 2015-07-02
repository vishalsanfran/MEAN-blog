var mongoose = require('mongoose'),
    Article = mongoose.model('Article');

//error handling method
var getErrorMessage = function(err) {
  if (err.errors) {
    //iterates over the errors collection and extract the first message
    //don't want to overwhelm your users with multiple error messages at once
    for (var errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Unknown server error';
  }
};

//authorization middleware
//assumes that it gets executed only for requests containing articleId route parameter
exports.hasAuthorization = function(req, res, next) {
  //verify that the current user is the creator of the current article
    if (req.article.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};

//create a new article document
//use the HTTP request body as the JSON base object for the document and will 
//use the model save() method to save it to MongoDB
exports.create = function(req, res) {
    //created a new Article model instance using the HTTP request body
  var article = new Article(req.body);
  //added the authenticated Passport user as the article creator()
  article.creator = req.user;

  article.save(function(err) {
    if (err) {
        //return an error response and an appropriate HTTP error code 
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      // return the new article object as a JSON response
      res.json(article);
    }
  });
};

//provide the basic operations to retrieve a list of existing articles
exports.list = function(req, res) {
    //articles collection is sorted using the created property
    //populated the firstName, lastName, and fullName properties of the creator user object
  Article.find().sort('-created').populate('creator', 'firstName   lastName fullName')
    .exec(function(err, articles) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(articles);
    }
  });
};

//provide the basic operations to read an existing article document 
//from the database
exports.read = function(req, res) {
  res.json(req.article);
};

exports.articleByID = function(req, res, next, id) {
// / uses the id argument to find an article and reference it using the req.article property
  Article.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, article) {
    if (err) return next(err);
    if (!article) return next(new Error('Failed to load article ' + id));

    req.article = article;
    next();
  });
};

//provide the basic operations to update an existing article document
//Assumes that you already obtained the article object in the articleByID()
//use the existing article object as the base object, and then update
//the title and content fields using the HTTP request body
exports.update = function(req, res) {
  var article = req.article;

  article.title = req.body.title;
  article.content = req.body.content;

//save changes to DB
  article.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

//basic operations to delete an existing article document
//Assumes that you already obtained the article object in the articleByID()
exports.delete = function(req, res) {
  var article = req.article;
//remove from DB
  article.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};