module.exports = function(grunt, options) {
  'use strict';

  var frontend = options.frontend;
  var autoprefixer = require('autoprefixer');


  var task = {
    options: {
      map: false,
      processors: [
        autoprefixer
      ]
    },
    css: {
      src: frontend.build.cssMin,
      dest: frontend.build.cssMin
    }
  };


  return task;
};
