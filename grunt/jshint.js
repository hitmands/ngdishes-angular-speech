module.exports = function(grunt, options) {
  'use strict';

  var frontend = options.frontend;

  var task = {
    options: {
      force: true
    },
    frontend: {
      options: {
        jshintrc: './config/frontend.jshintrc'
      },
      src: [
        frontend.build.js
      ]
    }
  };


  return task;
};
