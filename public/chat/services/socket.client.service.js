// Using services singleton architecture to wrap your socket client

angular.module('chat').service('Socket', 
    ['Authentication', '$location', '$timeout',

  //check if user is authenticated    
  function(Authentication, $location, $timeout) {
    if (Authentication.user) {
        //user auth'd, set service socket property
      this.socket = io();
    } else {
      //is not redirect to homepage
      $location.path('/');
    }

    ////wrapping socket on() to service method
    this.on = function(eventName, callback) {
      if (this.socket) {
        this.socket.on(eventName, function(data) {
        //inform angularJS about changes made to data model by 3rd party socket client
          $timeout(function() {
            callback(data);
          });
        });
      }
    };

    //wrapping socket emit() to service method
    this.emit = function(eventName, data) {
      if (this.socket) {
        this.socket.emit(eventName, data);
      }
    };

    ////wrapping socket removeListener() to service method
    this.removeListener = function(eventName) {
      if (this.socket) {
        this.socket.removeListener(eventName);
      }
    };
  }
]);