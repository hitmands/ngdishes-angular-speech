module.exports = function(grunt, options) {
  'use strict';

  function stripPublicDir(str) {
    return str.replace(frontend.publicDir, "/");
  }
  function stripSrcDir(str) {
    return str.replace(frontend.src, "/");
  }

  var fs = require('fs');

  var htmlPartials = [];
  var frontend = options.frontend;
  var vendor = frontend.vendor;
  var build = frontend.build;
  var htmlUtils = require(__dirname + '/helpers/HtmlUtils.js');
  var buster = require(__dirname + '/helpers/CacheBuster.js')(frontend);
  var productionCacheBuster = frontend.cacheBuster.pathMode ? buster.toPath : buster.toQueryString;
  var favicons = [
    '<link rel="icon" href="'+ buster.toQueryString('/images/favicon.ico') +'" type="image/x-icon">'
  ].join('\n');

  var START_CONDITIONAL_COMMENT = '<!--[if gt IE '+ (frontend.IE9 ? '8' : '9') +']><!-->';
  var END_CONDITIONAL_COMMENT = '<!--<![endif]-->';



  grunt.task.registerTask('frontendIncludes', 'Manages Assets Includes Partials and Cache Busting', function() {


    /**
     * @description PACKED Include <head>
     */
    (function() {
      var tpl = "";
      var buster = productionCacheBuster;

      tpl += favicons;

      if(vendor.modernizrMin) {
        tpl += htmlUtils.tagScript( buster(stripSrcDir( vendor.modernizrMin )) );
      }

      tpl += htmlUtils.tagCss( buster(stripPublicDir( build.cssMin )) );

      htmlPartials.push({
        path: frontend.cacheBuster.dest + 'head.pack' + frontend.cacheBuster.ext,
        html: tpl
      });

    }).call(this);

    /**
     * @description PACK Include <footer>
     */
    (function() {

      var tpl = "";
      var buster = productionCacheBuster;

      tpl += START_CONDITIONAL_COMMENT;

      tpl += htmlUtils.tagScript( buster(stripPublicDir(build.jsPack)) );

      tpl += END_CONDITIONAL_COMMENT;

      htmlPartials.push({
        path: frontend.cacheBuster.dest + 'footer.pack' + frontend.cacheBuster.ext,
        html: tpl
      });

    }).call(this);

    /**
     * @description PRODUCTION Include <head>
     */
    (function() {
      var tpl = "";
      var buster = productionCacheBuster;

      tpl += favicons;

      if(vendor.modernizrMin) {
        tpl += htmlUtils.tagScript( buster(stripSrcDir( vendor.modernizrMin )) );
      }

      tpl += htmlUtils.tagCss( buster(stripPublicDir( build.cssMin )) );

      tpl += START_CONDITIONAL_COMMENT;

      tpl += htmlUtils.tagScript( buster(stripPublicDir(build.angularLib)) );

      tpl += htmlUtils.tagScript( buster(stripPublicDir( vendor.angularMinDest )) );

      tpl += htmlUtils.tagScript( buster(stripPublicDir(build.applicationLib)) );


      tpl += END_CONDITIONAL_COMMENT;

      htmlPartials.push({
        path: frontend.cacheBuster.dest + 'head.production' + frontend.cacheBuster.ext,
        html: tpl
      });

    }).call(this);

    /**
     * @description PRODUCTION Include <footer>
     */
    (function() {

      var tpl = "";
      var buster = productionCacheBuster;

      tpl += START_CONDITIONAL_COMMENT;

      tpl += htmlUtils.tagScript( buster(stripPublicDir( build.jsMin )) );
      tpl += htmlUtils.tagScript( buster(stripPublicDir( build.tpls )) );

      tpl += END_CONDITIONAL_COMMENT;

      htmlPartials.push({
        path: frontend.cacheBuster.dest + 'footer.production' + frontend.cacheBuster.ext,
        html: tpl
      });

    }).call(this);

    /**
     * @description DEVELOPMENT Include <footer>
     */
    (function() {

      var tpl = "\n";

      tpl += START_CONDITIONAL_COMMENT + "\n";

      tpl += htmlUtils.tagScript( stripPublicDir( build.js )) + "\n";

      tpl += END_CONDITIONAL_COMMENT + "\n\n";

      htmlPartials.push({
        path: frontend.cacheBuster.dest + 'footer.development' + frontend.cacheBuster.ext,
        html: tpl
      });

    }).call(this);

    /**
     * @description DEVELOPMENT Include <head>
     */
    (function() {
      var tpl = "\n";

      if(vendor.modernizr) {
        tpl += htmlUtils.tagScript( buster.toQueryString(stripSrcDir( vendor.modernizr )) ) + "\n\n";
      }

      tpl += favicons + '\n';

      tpl += htmlUtils.tagCss( buster.toQueryString(stripPublicDir( build.css )) ) + "\n";

      tpl += START_CONDITIONAL_COMMENT + "\n";

      for(var i = 0; i < vendor.js.angularDependencies.length; i++) {
        var src1 = buster.toQueryString(stripSrcDir(vendor.js.angularDependencies[i]));
        tpl += htmlUtils.tagScript(src1) + "\n";
      }

      tpl += htmlUtils.tagScript( buster.toQueryString(stripPublicDir( vendor.angularDest )) ) + "\n";

      for(var j = 0; j < vendor.js.applicationDependencies.length; j++) {
        var src2 = buster.toQueryString(stripSrcDir(vendor.js.applicationDependencies[j]));

        tpl += htmlUtils.tagScript(src2) + "\n";
      }

      tpl += END_CONDITIONAL_COMMENT + "\n";

      htmlPartials.push({
        path: frontend.cacheBuster.dest + 'head.development' + frontend.cacheBuster.ext,
        html: tpl
      });

    }).call(this);




    /**
     * @description Write Include Files
     */
    (function() {
      for(var i = 0; i < htmlPartials.length; i++) {
        var partial = htmlPartials[i];
        grunt.file.write(partial.path, partial.html);
        grunt.log.ok('WRITING INCLUDE ', partial.path);
      }
    }).call(this);

  });
};
