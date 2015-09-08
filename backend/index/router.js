(function() {
  var path = require('path');
  var isStaticRequestMiddleware = require(path.join(__dirname, 'helpers', 'isStaticRequestMiddleware'));
  var IndexCtrl = require(path.join(__dirname, 'controllers', 'IndexCtrl'));

  function IndexRouter(app) {

    app.get('*', isStaticRequestMiddleware, IndexCtrl);
  }


  module.exports = IndexRouter;
}).call(this);
