//server side event handlers for chat app

module.exports = function(io, socket) {
  //inform all the connected socket clients about the newly connected user 
  //emitting the chatMessage event, and passing a chat message object with the 
  //user information and the message text, time, and type
  io.emit('chatMessage', {
    type: 'status',
    text: 'connected',
    created: Date.now(),
    username: socket.request.user.username
  });

//chatMessage event handler takes care of messages sent from the socket client
//add the message type, time, and user information
  socket.on('chatMessage', function(message) {
    message.type = 'message';
    message.created = Date.now();
    message.username = socket.request.user.username;
    
//send the modified message object to all connected socket clients using the io.emit()
    io.emit('chatMessage', message);
  });

//When a certain user is disconnected from the server, the event handler will 
//notify all the connected socket clients about this event by using the io.emit()
  socket.on('disconnect', function() {
    io.emit('chatMessage', {
    type: 'status',
    text: 'disconnected',
    created: Date.now(),
    username: socket.request.user.username
    });
  });
};