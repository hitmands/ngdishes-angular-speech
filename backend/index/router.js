(function() {
  var path = require('path');
  var IndexCtrl = require(path.join(__dirname, 'controllers', 'IndexCtrl'));

  function IndexRouter(app) {

    app.get('*', IndexCtrl);
  }


  module.exports = IndexRouter;
}).call(this);
