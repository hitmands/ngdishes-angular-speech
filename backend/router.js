(function() {
  var path = require('path');

  function backendRouter(app) {

    require(path.join(__dirname, 'rest', 'router'))(app);

    // Respond 404 to all unmatched api
    app.use('/api*', function(req, res, next) {
      res.writeHead(404, 'API Not Found', {'content-type' : 'text/plain'});
      return res.end();
    });

    require(path.join(__dirname, 'index', 'router'))(app);
  }

  module.exports = backendRouter;
}).call(this);
