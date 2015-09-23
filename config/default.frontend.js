module.exports = function() {
  'use strict';

  var ngMainModule = "NgDishes";

  var _ts = Date.now();
  var path = require('path');

  var src = "./src/";
  var dest = "./public/";
  var build = dest + "build/";
  var scss = src + "scss/";
  var ng = src + 'js/';
  var vendor = src + "vendor/";

  var configs = {
    ENV : 'development',
    PRODUCTION : false,
    src: src,
    dest: dest,
    publicDir: dest
  };

  configs.httpPath = 'http://localhost:3000/';
  configs.IE9 = false;

  configs.cacheBuster = {
    pathMode: true, //[false = QueryString; true = Path;]
    uniq: _ts,
    ts: _ts,
    ext: '.html',
    dest: build + "includes/"
  };

  configs.build = {
    dir : build,
    js : build + "application.js",
    jsMin : build + "application.min.js",
    angularLib : build + "angular.lib.min.js",
    applicationLib : build + "application.lib.min.js",
    jsPack : build + "application.pack.min.js",
    tpls : build + "application.tpls.min.js",
    css : build + "application.css",
    cssLib : build + "bootstrap.css",
    cssMin : build + "application.min.css"
  };

  configs.images = {
    src : src + 'images',
    dest : '',
    cdn : ''
  };

  configs.fonts = {
    src : src + 'fonts',
    dest : '',
    cdn : ''
  };

  configs.css = {
    dir : scss,
    input : scss + "application.scss",
    framework: scss + "bootstrap.scss"
  };

  configs.ng = {
    app : ngMainModule,
    dir : ng,
    input : ng + "application.js",
    modules : [
      "errors",
      "i18n",
      "auth",
      "index",
      "restaurant"
    ]
  };

  configs.i18n = {
    // http://www.w3schools.com/tags/ref_language_codes.asp
    jsonsOutputDir: build + 'i18n/',
    input: path.join(__dirname, '..', 'src/utils/excel/i18n.xlsx'),
    languages: [
      {
        name: 'english',
        iso: 'en'
      },
      {
        name: 'italiano',
        iso: 'it'
      }
    ]
  };

  configs.vendor = {
    dir : vendor,

    angular: vendor + "angular/angular.js",
    angularMin: vendor + "angular/angular.min.js",
    angularDest: build + "angular.js",
    angularMinDest: build + "angular.min.js",

    modernizr: vendor + 'modernizr/modernizr.js',
    modernizrMin: vendor + 'modernizr/modernizr.js',

    "js" : {
      "angularDependencies" : [
        vendor + "moment/moment.js"
      ],
      "applicationDependencies" : [
        vendor + "angular-ui-router/release/angular-ui-router.js",
        vendor + "angular-bootstrap/ui-bootstrap.js",
        vendor + "angular-bootstrap/ui-bootstrap-tpls.js",
        vendor + "angular-translate/angular-translate.js",
        vendor + "angular-dynamic-locale/dist/tmhDynamicLocale.js",
        vendor + "angular-translate-loader-static-files/angular-translate-loader-static-files.js",
        vendor + "angular-sanitize/angular-sanitize.js",
        vendor + "ngprogress/build/ngprogress.js",
        vendor + "angular-animate/angular-animate.js"
      ],
      "angularDependenciesMin" : [
        vendor + "moment/min/moment.min.js"
      ],
      "applicationDependenciesMin" : [
        vendor + "angular-ui-router/release/angular-ui-router.min.js",
        vendor + "angular-bootstrap/ui-bootstrap.min.js",
        vendor + "angular-bootstrap/ui-bootstrap-tpls.min.js",
        vendor + "angular-translate/angular-translate.min.js",
        vendor + "angular-dynamic-locale/tmhDynamicLocale.min.js",
        vendor + "angular-translate-loader-static-files/angular-translate-loader-static-files.min.js",
        vendor + "angular-sanitize/angular-sanitize.min.js",
        vendor + "ngprogress/build/ngprogress.min.js",
        vendor + "angular-animate/angular-animate.min.js"
      ]
    }
  };

  configs.banner = "/**!\n * @Project: <%= pkg.name %>\n * @Authors: [<%= pkg.authors.join(', ') %>]\n * @Link: <%= pkg.homepage %>\n * @License: <%= pkg.license %>\n * @Date: <%= grunt.template.today('yyyy-mm-dd') %>\n * @Version: <%= pkg.version %>\n***/\n\n";

  return configs;
}();
