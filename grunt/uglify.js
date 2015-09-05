module.exports = function(grunt, options) {
  'use strict';

  var frontend = options.frontend;
  var FSYS = JSON.stringify({
    DEPLOYED_TS: frontend.cacheBuster.ts,
    VERSION: options.pkg.version,
    PKG: options.pkg.name,
    APP: frontend.ng.app
  });


  var task =  {
    options: {
      mangle: false,
      sourceMap: true,
      compress: {
        sequences: false,
        unused: false
      },
      beautify: {
        indent_level: 3,
        indent_start: 6,
        ascii_only: true,
        beautify: true,
        bracketize: true,
        semicolons: true,
        quote_keys: true,
        width: 80
      },
      banner: "",
      footer: "",
      preserveComments: function(node, comment) {
        var whiteList = /(jshint|@ngInject|@preserve)/gi;
        var keepComment = false;

        if( whiteList.test(comment.value) ) {
          keepComment = true;
        }

        return keepComment;
      }
    },
    development: {
      options: {
        banner: "(function(window, undefined) {\n   'use strict';\n   " +
        "(function(window, angular, moment, FSYS) {\n",
        footer: "\n\n   })(window, window.angular, window.moment, window.angular.extend("+ FSYS +", window.FSYS));\n})(window);"
      },
      files: [
        {
          src: options.ngFiles,
          dest: frontend.build.js
        }
      ]
    },
    production: {
      options: {
        mangle: {
          except: []
        },
        compress: {
          drop_console: true,
          join_vars: true,
          unused: true
        },
        beautify: {
          ascii_only: true,
          beautify: false
        },
        sourceMap: false,
        preserveComments: false,
        banner: '',
        footer: '\n'
      },
      files: [
        {
          src: frontend.build.js,
          dest: frontend.build.jsMin
        },
        {
          src: frontend.build.tpls,
          dest: frontend.build.tpls
        }
      ]
    }
  };

  return task;
};
