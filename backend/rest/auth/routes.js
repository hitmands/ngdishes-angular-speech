(function() {
  'use strict';

  var path = require('path');
  var basicAuthDecoderMiddleware = require( path.join(__dirname, 'helpers', 'basicAuthDecoderMiddleware') );
  var authCheckerMiddleware = require( path.join(__dirname, 'helpers', 'authCheckerMiddleware') );


  function AuthenticationRouter(app) {

    /**
     * Checks if the Authentication Method exists
     */
    app.all('*', authCheckerMiddleware, basicAuthDecoderMiddleware);

  }

  module.exports = AuthenticationRouter;
}).call(this);
