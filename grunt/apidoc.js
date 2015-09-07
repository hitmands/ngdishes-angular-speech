module.exports = function(grunt, options) {
  'use strict';

  var frontend = options.frontend;

  var task = {
    backend: {
      src: "./backend/",
      dest: "./backend/wiki/",
      options: {
        debug: false,
        includeFilters: [ ".*/routes.js$" ]
      }
    }
  };


  return task;
};
