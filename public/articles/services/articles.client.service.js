//service to communicate with the API endpoint
angular.module('articles').factory('Articles', ['$resource', function($resource) {
    //base URL for the resource endpoints
    //routing parameter assignment using the article's document _id field
  return $resource('api/articles/:articleId', {
    articleId: '@_id'
  }, {
    //actions argument extending the resource methods with an
    //update() method that uses the PUT HTTP
    update: {
      method: 'PUT'
    }
  });
}]);