(function() {
  'use strict';

  var
    Promise = require('bluebird'),
    ejs = require('ejs'),
    fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    registry = require('simple-registry'),
    frontendConfigs = registry.get('frontendConfigs'),

    indexTemplate = path.join(__dirname, 'Index.ejs'),
    staticResourcesDir = path.join(global.__appdir, 'public', 'build', 'includes'),
    ENCODING = 'UTF8',

    defaultContext = {}
    ;

  var
    HEAD_DEV = fs.readFileSync(path.join(staticResourcesDir, 'head.development.html'), ENCODING),
    FOOTER_DEV = fs.readFileSync(path.join(staticResourcesDir, 'footer.development.html'), ENCODING),

    HEAD_PROD = fs.readFileSync(path.join(staticResourcesDir, 'head.production.html'), ENCODING),
    FOOTER_PROD = fs.readFileSync(path.join(staticResourcesDir, 'footer.production.html'), ENCODING),

  /*
   HEAD_PACK = fs.readFileSync(path.join(staticResourcesDir, 'head.pack.html'), ENCODING),
   FOOTER_PACK = fs.readFileSync(path.join(staticResourcesDir, 'footer.pack.html'), ENCODING),
   /**/

    BODY = fs.readFileSync(path.join(__dirname, '_body.ejs'), ENCODING)
    ;


  module.exports = function IndexCtrl(req, res) {
    var context = _.merge({}, defaultContext);
    var FSYS = {};

    var
      USE_MINIFIED = (req.query.min !== 'false'),
      IS_DEBUG = !!(req.query.debug),
      headHtml = HEAD_DEV,
      footerHtml = FOOTER_DEV
      ;

    if(global.IS_PRODUCTION && USE_MINIFIED) {
      headHtml = HEAD_PROD;
      footerHtml = FOOTER_PROD;
    }


    return Promise
      .all([headHtml, footerHtml])
      .then(function(viewParts) {
        context.app = frontendConfigs.ng.app;
        context.CACHE_BUSTER = frontendConfigs.cacheBuster.uniq;
        context.html = {
          head : viewParts.shift(),
          footer : viewParts.pop(),
          classes : []
        };

        return context;
      })
      .then(function(context) {
        FSYS.session = null;

        return context;
      })
      .then(function(context) {
        var userLang = req.headers["accept-language"].split(',').shift();
        var defaultLang = frontendConfigs.i18n.languages[0];

        context.lang = userLang || (defaultLang && defaultLang.iso) || 'en';
        FSYS.i18n = {
          languages : frontendConfigs.i18n.languages
        };

        return context;
      })
      .then(function(context) {

        context.html.classes.push(
          res.locals.is_mobile ? 'device-is-mobile' : 'device-not-mobile' ,
          'device-is-' + req.device.type.toLowerCase(),
          'device-name-' + req.device.name.toLowerCase(),
          'env-id-' + global.APP_ENV,
          global.IS_PRODUCTION ? 'env-is-production' : 'env-not-production',
          IS_DEBUG ? 'env-is-debug' : 'env-not-debug'
        );

        return context;
      })
      .then(function(context) {
        context.FSYS = JSON.stringify(_.merge(FSYS, {
          DEBUG : IS_DEBUG,
          PRODUCTION : global.IS_PRODUCTION,
          DEVICE_NAME : req.device.name.toUpperCase(),
          DEVICE_TYPE : req.device.type.toUpperCase(),
          DEVICE_IS_MOBILE : res.locals.is_mobile
        }));
        return ejs.render(BODY, context);
      })
      .then(function(body) {
        context.html.body = body;
        context.html.classes = context.html.classes.join(' ');
        return res.render(indexTemplate, context);
      })
      ;
  };

})();
