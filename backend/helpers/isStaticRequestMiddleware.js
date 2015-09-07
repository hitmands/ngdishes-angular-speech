(function() {

  var isStatic = /^(\/)?(assets|build|images|fonts|vendor|partials)/i;

    function isStaticRequestMiddleware(req, res, next) {

    if(isStatic.test(req.originalUrl) && !fs.existsSync(req.originalUrl)) {
      return res.status(404).end();
    }

    return next();
  }


  module.exports = isStaticRequestMiddleware;
}).call(this);
