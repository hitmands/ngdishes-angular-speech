module.exports = function(grunt, options) {
  'use strict';

  var frontend = options.frontend;
  var eyeglass = require('eyeglass');

  var task = {
    options: {

    },
    development: {
      options: eyeglass.decorate({
        indentedSyntax: true,
        outputStyle: 'nested',
        sourceMap: true
      }),
      files: [
        {
          src: frontend.css.input,
          dest: frontend.build.css
        },
        {
          src: frontend.css.framework,
          dest: frontend.build.cssLib
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
          src: frontend.css.input,
          dest: frontend.build.cssMin
        },
        {
          src: frontend.css.framework,
          dest: frontend.build.cssLib
        }
      ]
    }
  };


  return task;
};
