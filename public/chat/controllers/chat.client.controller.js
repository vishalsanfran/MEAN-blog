angular.module('chat').controller('ChatController', ['$scope', 'Socket',
  function($scope, Socket) {
    $scope.messages = [];
  
  //chatMessage event listener that will add retrieved messages to this array
    Socket.on('chatMessage', function(message) {
      $scope.messages.push(message);
    });
    
    //sendMessage() method will send new messages by emitting the chatMessage 
    //event to the socket server
    $scope.sendMessage = function() {
      var message = {
        text: this.messageText,
      };
      
      Socket.emit('chatMessage', message);
            
      this.messageText = '';
    }
  
  //$destory event will be emitted when the controller instance is deconstructed
  //its important to remove the event handler
    $scope.$on('$destroy', function() {
      Socket.removeListener('chatMessage');
    })

  }
]);