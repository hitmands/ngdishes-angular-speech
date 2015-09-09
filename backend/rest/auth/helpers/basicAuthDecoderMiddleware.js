(function() {
  'use strict';

  var _ = require('lodash');
  var Promise = require('bluebird');

  function basicAuthenticationDecoderMiddleware(req, res, next) {
    var basicAuth = req.header('Authorization');
    var method;

    if(!_.isString(basicAuth)) {
      return next();
    }

    Promise
      .all(basicAuth.split(' '))
      .then(function(auth) {
        method = auth.shift();

        return auth.pop();
      })
      .then(function(b64) {

        return (new Buffer(b64, 'base64')).toString().split(':');
      })
      .then(function(credentials) {

        return {
          method: method,
          password: credentials.pop(),  // TODO: HASH password field
          username: credentials.shift()
        };
      })
      .then(function(credentials) {

        if(!req.auth) {
          req.auth = {};
        }

        return req.auth.credentials = credentials;
      })
      .then(function() {

        return next();
      })
      .catch(function(error) {

        res.status(500).end();
      })
    ;



  }

  module.exports = basicAuthenticationDecoderMiddleware;
}).call(this);
