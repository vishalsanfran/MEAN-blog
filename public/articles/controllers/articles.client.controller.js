// ArticlesController is using four injected services
//$routeParams - holds references to route parameters of the AngularJS routes
//$location: This allows you to control the navigation of your application
//Authentication: provides you with the authenticated user information
//Articles: provides you with a set of methods to communicate with RESTful endpoints
angular.module('articles').controller('ArticlesController',
    ['$scope', '$routeParams', '$location', 'Authentication', 'Articles',
  function($scope, $routeParams, $location, Authentication, Articles) {
    //controller binds the Authentication service to the $scope object so that 
    //views will be able to use it as well
    $scope.authentication = Authentication;
  
  
    $scope.create = function() {
    //creating a new articles using title, content from the view that called the method    
    var article = new Articles({
      title: this.title,
      content: this.content
    });
  
    //article resource $save() method to send the new article object to the 
    //corresponding RESTful endpoint
    article.$save(function(response) {
        // server responds with a success (200) status code
      //use the $location service to navigate to the route that will present the
      //created article.  
      $location.path('articles/' + response._id);
    }, function(errorResponse) {
      //assign the error message to the $scope object, so the view will be able
      //to present it to the user
      $scope.error = errorResponse.data.message;
    });
    };
    
    //uses the resource query() method because it expects a collection
    //both methods are assigning the result to the $scope variable so that 
    //views could use it to present the data
    //Both methods will use the Articles service to communicate with the 
    //corresponding RESTful endpoints
    $scope.find = function() {
      $scope.articles = Articles.query();
    };
    
    $scope.findOne = function() {
      $scope.article = Articles.get({
        articleId: $routeParams.articleId
      });
    };
    
    //basic operations for updating an existing article
    $scope.update = function() {
        //used the resource article's $update() method to send the updated article
        //object to the corresponding RESTful endpoint
      $scope.article.$update(function() {
          //Success. use the $location service to navigate to the route that will 
          //present the updated article
        $location.path('articles/' + $scope.article._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    
    //basic operations for deleting an existing article
    $scope.delete = function(article) {
        //if user is deleting an article from a list or directly from the article view
      if (article) {
        article.$remove(function() {
          for (var i in $scope.articles) {
            if ($scope.articles[i] === article) {
                //remove the deleted object from the articles collection
              $scope.articles.splice(i, 1);
            }
          }
        });
        //or if user is deleting directly from the article view
      } else {
        $scope.article.$remove(function() {
            //redirect the user back to the list view
          $location.path('articles');
        });
      }
    };
  }
]);

