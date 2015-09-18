module.exports = function(grunt, options) {
  'use strict';

  var frontend = options.frontend;
  var autoprefixer = require('autoprefixer');

  var autoprefixerOptions = {
    browsers: ['last 2 versions']
  };


  var autoprefixer = autoprefixer(autoprefixerOptions);

  var task = {
    options: {
      map: false,
      processors: [
        autoprefixer
      ]
    },
    deploy: {
      src: frontend.build.cssMin,
      dest: frontend.build.cssMin
    },
    development: {
      src: frontend.build.css,
      dest: frontend.build.css
    }
  };


  return task;
};
