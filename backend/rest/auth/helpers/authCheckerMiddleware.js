(function() {
  'use strict';

  function authCheckerMiddleware(req, res, next) {

    if(!req.auth) {
      req.auth = {};
    }

    req.auth.isUserLoggedIn = false;        // TODO: check if the user is already loggedIn
    req.auth.authenticationToken = null;    // TODO: implement authentication token

    next();
  }


  module.exports = authCheckerMiddleware;
}).call(this);
