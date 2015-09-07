(function() {
  var path = require('path');
  var isStaticRequestMiddleware = require(path.join(__dirname, 'helpers', 'isStaticRequestMiddleware'));
  var IndexCtrl = require(path.join(__dirname, 'index', 'IndexCtrl'));

  function backendRouter(app) {

    require( path.join(__dirname, 'rest', 'router' ) )(app);

    app.get('*', isStaticRequestMiddleware, IndexCtrl);
  }


  module.exports = backendRouter;
}).call(this);
