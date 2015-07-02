exports.render = function(req, res) {
  
  if (req.session.lastVisit) {
    console.log(req.session.lastVisit);
  }

  req.session.lastVisit = new Date();
  
  //res.render({EJS template}, {object containing template variables})
  res.render('index', {
    title: 'Hello World',
    user: JSON.stringify(req.user)
    //userFullName: req.user ? req.user.fullName : ''
  })
};