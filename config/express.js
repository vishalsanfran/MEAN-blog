var config = require('./config'),
  http = require('http'),
  socketio = require('socket.io'),
  express = require('express'),
  morgan = require('morgan'),
  compress = require('compression'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  session = require('express-session'),
  MongoStore = require('connect-mongo')(session),
  flash = require('connect-flash'),
  passport = require('passport');

module.exports = function(db) {
    //create new instance of express app
    var app = express();
    //http core module to create a server object that wraps Express app object
    var server = http.createServer(app);
    // attach the Socket.io server with your server object using listen()
    var io = socketio.listen(server);
    
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    
    
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

//created a new connect-mongo instance and passed it your Mongoose connection object
    var mongoStore = new MongoStore({
      db: db.connection.db
    });

    //add session object
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
    store: mongoStore   //store session info 
    }));

    //configure express app views and template engine
    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    //create the new flash area in the application session
    app.use(flash());
    // bootstrapping and session tracking
    app.use(passport.initialize());
    app.use(passport.session());

    //add support for static middleware
    app.use(express.static('./public'));
    
    //routing file called as a function with the argument the above app
    require('../app/routes/index.server.routes.js')(app);
    
    require('../app/routes/users.server.routes.js')(app);
    
    require('../app/routes/articles.server.routes.js')(app);
    //execute your Socket.io configuration method and 
    //will take care of setting the Socket.io session
    require('./socketio')(server, io, mongoStore);
    
    // now running Socket.io server along with Express app
    return server;
    //return app;
}