module.exports = function() {
  'use strict';
  var dest = "./public/";
  var src = "./src/";
  var build = dest + "build/";
  var vendor = src + "vendor/";

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

  return configs;
}();
