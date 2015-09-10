(function() {
  "use strict";
  /*jshint es5: true */

  var
    NODE_ENV = process.env.NODE_ENV || 'development',
    IS_PRODUCTION = /^production$/i.test(NODE_ENV),
    registry = require('simple-registry'),
    bodyParser = require('body-parser'),
    device = require('express-device'),
    express = require('express'),
    path = require('path'),
    _ = require('lodash'),
    fs = require('fs'),
    app = express(),
    serverPort,
    server
    ;

  var
    isStatic = require(path.join(__dirname, 'backend', 'helpers', 'isStaticRequestMiddleware')),
    frontendConfigs = require(path.join(__dirname, 'config',
      (IS_PRODUCTION ? 'production' : 'default') + '.frontend.js')
    )
    ;


  global.__appdir = __dirname;
  global.IS_PRODUCTION = IS_PRODUCTION;
  global.APP_ENV = NODE_ENV;


  app
    .set('port', 3001)
    .set('view engine', 'ejs')
    .use('/assets', express.static(path.join(__dirname, 'public')))
    .use('/build', express.static(path.join(__dirname, 'public', 'build')))
    .use('/images', express.static(path.join(__dirname, 'src', 'images')))
    .use('/fonts', express.static(path.join(__dirname, 'src', 'fonts')))
    .use('/vendor', express.static(path.join(__dirname, 'src', 'vendor')))
    .use('/partials', express.static(path.join(__dirname, 'src', 'js')))
    .use(isStatic)
    .use(device.capture({ parseUserAgent : true }))
    .use(bodyParser.urlencoded({ extended : true }))
    .use(bodyParser.json())
  ;

  device.enableDeviceHelpers(app);

  registry.set('frontendConfigs', frontendConfigs);
  require(path.join(__dirname, 'backend', 'router'))(app);

  serverPort = app.get('port');
  server = app.listen(serverPort, function() {
    console.log('\nng-dishes-angular-speech,\n' + (NODE_ENV || 'Development') + ' Server listening on port:', serverPort, ' | ', Date(), '\n');
  });
})();
