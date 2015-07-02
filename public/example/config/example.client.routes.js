//$routeProvider object, which provides several methods to define your AngularJS 
//application routing behavior

//grab the example module and executed the config() 
//method to create a new configuration block
// /applied DI to inject the $routeProvider object to your configuration 
//function, and the $routeProvider.when() method to define a new route
angular.module('example').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
        //template's URL
      templateUrl: 'example/views/example.client.view.html',
      //controller: 'ExampleController'
    }).
    //define the behavior of the router when the user navigates to an undefined URL
    otherwise({
      redirectTo: '/'
    });
  }
]);