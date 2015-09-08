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

  var frontendConfigs = require(path.join(__dirname, 'config', 'default.frontend.js'));


  global.__appdir = __dirname;
  global.IS_PRODUCTION = IS_PRODUCTION;
  global.APP_ENV = NODE_ENV;


  app
    .set('port', 3000)
    .set('view engine', 'ejs')
    .use(device.capture({ parseUserAgent : true }))
    .use('/assets', express.static(path.join(__dirname, 'public')))
    .use('/build', express.static(path.join(__dirname, 'public', 'build')))
    .use('/images', express.static(path.join(__dirname, 'src', 'images')))
    .use('/fonts', express.static(path.join(__dirname, 'src', 'fonts')))
    .use('/vendor', express.static(path.join(__dirname, 'src', 'vendor')))
    .use('/partials', express.static(path.join(__dirname, 'src', 'js')))
    .use(bodyParser.urlencoded({extended : true}))
    .use(bodyParser.json())
  ;

  device.enableDeviceHelpers(app);

  if(!IS_PRODUCTION) {
    frontendConfigs = _.merge(frontendConfigs, require(path.join(__dirname, 'config', 'production.frontend.js')));
  }

  registry.set('frontendConfigs', frontendConfigs);
  require(path.join(__dirname, 'backend', 'router'))(app);

  serverPort = app.get('port');
  server = app.listen(serverPort, function() {
    console.log('\nyoox-angular-speech,\n' + (process.env.NODE_ENV || 'Development') + ' Server listening on port:', serverPort, ' | ', Date(), '\n');
  });
})();
