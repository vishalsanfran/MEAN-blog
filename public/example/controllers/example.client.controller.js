//angular.module() is used to retrieve the example module.
//AngularJS's controller() is used  to create ExampleController constructor
//applied DI in constructor to inject $scope object, Authentication service
angular.module('example').controller('ExampleController', 
  ['$scope', 'Authentication',
  function($scope, Authentication) {
    //used the $scope object to define a name property, 
    //which will later be used by your view.
    $scope.name = Authentication.user ?
        Authentication.user.fullName : 'MEAN Application';
    //allow your example view to fully use the Authentication service    
    $scope.authentication = Authentication;
  }
]);