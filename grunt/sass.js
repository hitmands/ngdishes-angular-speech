module.exports = function(grunt, options) {
  'use strict';

  var frontend = options.frontend;

  var task = {
    options: {

    },
    development: {
      options: {
        indentedSyntax: true,
        outputStyle: 'nested',
        sourceMap: true
      },
      files: [
        {
          src: frontend.css.input,
          dest: frontend.build.css
        }
      ]
    },
    production: {
      options: {
        indentedSyntax: false,
        outputStyle: 'compressed',
        sourceMap: false
      },
      files: [
        {
          src: frontend.css.input,
          dest: frontend.build.cssMin
        }
      ]
    }
  };


  return task;
};
