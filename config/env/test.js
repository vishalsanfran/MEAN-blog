module.exports = {
  db: 'mongodb://' + process.env.IP + '/mean-book-test',
  sessionSecret: 'developmentSessionSecret',
  viewEngine: 'ejs',
  facebook: {
    clientID: '1036699906346168',
    clientSecret: 'fbd7266ada7dfd8c8a7de720e1f4dc96',
    callbackURL: 'https://nodeproj-vishalsanfran.c9.io' +
      '/oauth/facebook/callback'
  },
  twitter: {
    clientID: 'DGHgE8HwMXZjFv3ficiGo915p',
    clientSecret: 'edgvQ7HCr5Fm0rEy7ffOTlkBuYMLijS1p2fN7QjtVm58byLkz0',
    callbackURL: 'https://nodeproj-vishalsanfran.c9.io/oauth/twitter/callback'
  },
  google: {
    clientID: '472193234697-g006vj1f005bk0mmrpihinigplttoljt.apps.googleusercontent.com',
    clientSecret: 'tO4vUZHoZAOaJwiZ-npKNk-A',
    callbackURL: 'https://nodeproj-vishalsanfran.c9.io/oauth/google/callback'
  }
};