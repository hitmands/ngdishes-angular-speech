module.exports = function(grunt, options) {
  'use strict';

  var frontend = options.frontend;

  var task = {
      options: {
        singleQuotes: true
      },
      modules: {
        files: [
          {
            src: frontend.build.js,
            dest: frontend.build.js
          }
        ]
      }
  };

  return task;
};
