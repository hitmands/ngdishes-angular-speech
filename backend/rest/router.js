(function() {
  var path = require('path');

  function jsonRestfulRouter(app) {

    require(path.join(__dirname, 'restaurant', 'routes'))(app);

  }


  module.exports = jsonRestfulRouter;
}).call(this);
