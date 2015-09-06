module.exports = function(grunt, options) {
  'use strict';

  var frontend = options.frontend;

  var task = {
    options: {
      force: true
    },
    frontend: {
      options: {
        config: "config/frontend.jscsrc",
        esnext: false,
        verbose: true
      },
      files: [
        {
          src: frontend.ng.dir + '**/*.js'
        }
      ]
    }
  };


  return task;
};

