module.exports = function(app) {
    var index = 
    require('../controllers/index.server.controller');
    // use render() from index controller
    app.get('/', index.render);
};