/*
articles RESTful API will consist of five routes:

GET http://localhost:3000/articles: This will return a list of articles
POST http://localhost:3000/articles : This will create and return a new article
GET http://localhost:3000/articles/:articleId: This will return a single existing article
PUT http://localhost:3000/articles/:articleId: This will update and return a single existing article
DELETE http://localhost:3000/articles/:articleId: This will delete and return a single article
*/

var users = require('../../app/controllers/users.server.controller'),
    articles = require('../../app/controllers/articles.server.controller');

//define the base routes for your CRUD operations
module.exports = function(app) {
    //POST method uses the users.requiresLogin() middleware since a user need to
    //log in before they can create a new article
  app.route('/api/articles')
     .get(articles.list)
     .post(users.requiresLogin, articles.create);
  
  // PUT and DELETE methods use both the users.requiresLogin() and 
  //articles.hasAuthorization() middleware, since users can only edit and delete
  //the articles they created
  app.route('/api/articles/:articleId')
     .get(articles.read)
     .put(users.requiresLogin, articles.hasAuthorization, articles.update)
     .delete(users.requiresLogin, articles.hasAuthorization, articles.delete);
     
//make sure every route that has the articleId parameter will first call the 
//articles.articleByID() middleware
  app.param('articleId', articles.articleByID);
};