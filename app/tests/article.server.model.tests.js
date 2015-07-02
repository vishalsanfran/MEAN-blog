var app = require('../../server.js'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Article = mongoose.model('Article');

var user, article;

//informs the test tool this test is going to examine the Article model
describe('Article Model Unit Tests:', function() {
  //beforeEach() method is used to define a block of code that
  //runs before each test is executed    
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      article = new Article({
        title: 'Article Title',
        content: 'Article Content',
        user: user
      });
    //finished, continue with the tests
      done();
    });
  });

  describe('Testing the save method', function() {
    it('Should be able to save without problems', function() {
      article.save(function(err) {
          //should.js assertion for no error
        should.not.exist(err);
      });
    });

    it('Should not be able to save an article without a title', function() {
      article.title = '';

      article.save(function(err) {
          //should.js assertion for error existence
        should.exist(err);
      });
    });
  });

//run after each test is executed
  afterEach(function(done) {
    Article.remove(function() {
      User.remove(function() {
        done();
      });
    });
  });
});