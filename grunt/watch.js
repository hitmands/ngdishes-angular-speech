module.exports = function(grunt, options) {
  'use strict';

  var frontend = options.frontend;

  var task = {
    angular: {
      tasks: ['angularWatch'],
      files: [
        frontend.ng.dir + '**/*.js'
      ]
    },
    scss: {
      tasks: ['sassWatch'],
      files: [
        frontend.css.dir + '**/*.scss'
      ]
    },
    i18n: {
      tasks: ['angularI18n'],
      files: [
        frontend.i18n.input
      ]
    },
    livereload: {
      options: {
        livereload: true,
        spawn: false
      },
      files: [
        frontend.ng.dir + '**/*.html',
        './public/**/*.{html,js,css,json}',
        './backend/**/*.ejs'
      ]
    }
  };

  return task;
};
