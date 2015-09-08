module.exports = function(grunt, options) {
  'use strict';

  var frontend = options.frontend;

  var task = {
    angular: {
      tasks: ['angularWatch'],
      files: [
        '!**/*.map',
        frontend.ng.dir + '**/*.js'
      ]
    },
    scss: {
      tasks: ['sassWatch'],
      files: [
        '!**/*.map',
        frontend.css.dir + '**/*.scss'
      ]
    },
    i18n: {
      tasks: ['angularI18n'],
      files: [
        '!**/*.map',
        frontend.i18n.input
      ]
    },
    livereload: {
      options: {
        livereload: true,
        spawn: false
      },
      files: [
        '!**/*.map',
        frontend.ng.dir + '**/*.html',
        './public/**/*.*',
        './backend/**/*.ejs'
      ]
    }
  };

  return task;
};
