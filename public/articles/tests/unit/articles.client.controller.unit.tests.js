describe('Testing Articles Controller', function() {
  var _scope, ArticlesController;

  beforeEach(function() {
    module('mean');

    jasmine.addMatchers({
      toEqualData: function(util, customEqualityTesters) {
        return {
          compare: function(actual, expected) {
            return {
              pass: angular.equals(actual, expected)
            };
          }
        };
      }
    });
    inject(function($rootScope, $controller) {
      _scope = $rootScope.$new();
      ArticlesController = $controller('ArticlesController', {
        $scope: _scope
      });
    });
  });

  it('Should have a find method that uses $resource to retrieve a list of articles', inject(function(Articles) {
    inject(function($httpBackend) {
      var sampleArticle = new Articles({
        title: 'An Article about MEAN',
        content: 'MEAN rocks!'
      });
      var sampleArticles = [sampleArticle];

//sets a new backend request assertion
      $httpBackend.expectGET('api/articles').respond(sampleArticles);
      
// controller's find() method, which will create a pending HTTP request
      _scope.find();
      
      //simulate the server's response
      $httpBackend.flush();

      expect(_scope.articles).toEqualData(sampleArticles);
    });
  }));
  it('Should have a findOne method that uses $resource to retreive a single of article', inject(function(Articles) {
    inject(function($httpBackend, $routeParams) {
      var sampleArticle = new Articles({
        title: 'An Article about MEAN',
        content: 'MEAN rocks!'
      });

      $routeParams.articleId = 'abcdef123456789012345678';

      $httpBackend.expectGET(/api\/articles\/([0-9a-fA-F]{24})$/).respond(sampleArticle);

      _scope.findOne();
      $httpBackend.flush();

      expect(_scope.article).toEqualData(sampleArticle);
    });
  }));
});