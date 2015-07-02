// Configuring the Socket.io session

var config = require('./config'),
  cookieParser = require('cookie-parser'),
  passport = require('passport');

module.exports = function(server, io, mongoStore) {
    //used the io.use() configuration method to intercept the handshake process
  io.use(function(socket, next) {
    //parse the handshake request cookie and retrieve the Express sessionId
    cookieParser(config.sessionSecret)(socket.request, {}, function(err) {
      var sessionId = socket.request.signedCookies['connect.sid'];

    //used the connect-mongo instance to retrieve the session information
    //from the MongoDB storage
      mongoStore.get(sessionId, function(err, session) {
        socket.request.session = session;
        
    //used the passport.initialize() and passport.session() middleware to populate
    //the session's user object according to the session information
        passport.initialize()(socket.request, {}, function() {
          passport.session()(socket.request, {}, function() {
            if (socket.request.user) {
                
              //user is authenticated, continue with socket init
              next(null, true);
            } else {
                
            //socket connection cannot be opened
              next(new Error('User is not authenticated'), false);
            }
          })
        });
      });
    });
  });

//socket server connection event is used to load the chat controller
//binds your event handlers directly with the connected socket
  io.on('connection', function(socket) {
    require('../app/controllers/chat.server.controller')(io, socket);
  });
};