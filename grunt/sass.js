module.exports = function(grunt, options) {
  'use strict';

  var frontend = options.frontend;
  var eyeglass = require('eyeglass');

  eyeglass.enableImportOnce = false;

  var task = {
    options: {

    },
    development: {
      options: eyeglass.decorate({
        indentedSyntax: true,
        outputStyle: 'nested',
        enableImportOnce: false,
        sourceMap: true
      }),
      files: [
        {
          src: [frontend.css.framework, frontend.css.input],
          dest: frontend.build.css
        }
      ]
    },
    production: {
      options: eyeglass.decorate({
        indentedSyntax: false,
        outputStyle: 'compressed',
        sourceMap: false,
        cache: false
      }),
      files: [
        {
          src: [frontend.css.framework, frontend.css.input],
          dest: frontend.build.cssMin
        }
      ]
    }
  };


  return task;
};
