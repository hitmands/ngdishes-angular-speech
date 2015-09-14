module.exports = function() {
  'use strict';

  var _ = require('lodash');
  var path = require('path');
  var _configs = require(path.join(__dirname, 'default.frontend.js'));

  var dest = _configs.dest;
  var src = _configs.src;
  var build = _configs.build;
  var vendor = _configs.vendor;

  var configs = {
    ENV: 'production',
    PRODUCTION: true
  };

  configs.build = {
    jsMin : build + "application.min.<%= uniq %>.js",
    angularLib : build + "angular.lib.min.<%= uniq %>.js",
    applicationLib : build + "application.lib.min.<%= uniq %>.js",
    jsPack : build + "application.pack.min.<%= uniq %>.js",
    tpls : build + "application.tpls.min.<%= uniq %>.js",
    cssMin : build + "application.min.<%= uniq %>.css"
  };

  configs.vendor = {
    angularMinDest : build + "angular.min.<%= uniq %>.js"
  };

  configs = _.merge(_configs, configs);
  return configs;
}();
