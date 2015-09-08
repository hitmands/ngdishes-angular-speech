(function() {
  var path = require('path');

  function backendRouter(app) {

    require( path.join(__dirname, 'rest', 'router' ) )(app);
    require( path.join(__dirname, 'index', 'router' ) )(app);

  }


  module.exports = backendRouter;
}).call(this);
