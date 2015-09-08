(function() {

  var fs = require('fs');
  var isStatic = /^(\/)?(assets|build|images|fonts|vendor|partials)/i;


  // Because express doesn't support properly the serve-static fallthrough options
  function isStaticRequestMiddleware(req, res, next) {

    if(isStatic.test(req.originalUrl) && !fs.existsSync(req.originalUrl)) {
      return res.status(404).end();
    }

    return next();
  }


  module.exports = isStaticRequestMiddleware;
}).call(this);
