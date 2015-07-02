//connect your views to your AngularJS application routing mechanism
angular.module('articles').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/articles', {
      templateUrl: 'articles/views/list-articles.client.view.html'
    }).
    when('/articles/create', {
      templateUrl: 'articles/views/create-article.client.view.html'
    }).
    //enable your controller to extract the articleId parameter 
    //using the $routeParams service
    when('/articles/:articleId', {
      templateUrl: 'articles/views/view-article.client.view.html'
    }).
    when('/articles/:articleId/edit', {
      templateUrl: 'articles/views/edit-article.client.view.html'
    });
  }
]);