module.exports = function(grunt) {
  'use strict';

  // TASKS
  grunt.task.registerTask('deploy', [
    'apidoc:backend',
    'frontend'
  ]);

  grunt.task.registerTask('deployProd', [
    'shell:deployProduction'
  ]);



  /* *** INITIALIZE CONFIGURATION *** */
  var _ = require('lodash');
  var ENV_PRODUCTION = /^production$/i.test(grunt.option('ENV'));
  var pkg = grunt.file.readJSON('./package.json');
  var frontendConfigs = 'default';

  if(ENV_PRODUCTION) {
    frontendConfigs = 'production';
    grunt.log.ok('Grunt Running in PRODUCTION environment');
  }

  frontendConfigs = require('./config/' + frontendConfigs + '.frontend.js');

  require('load-grunt-config')(grunt, {
    init: true,
    jitGrunt: {
      staticMappings: {
        "ngtemplates" : "grunt-angular-templates"
      }
    },
    data: {
      "pkg" : pkg,
      "frontend" : frontendConfigs,
      "ngFiles" : require('./grunt/helpers/NgFolderingPattern.js')(frontendConfigs),
      "uniq": frontendConfigs.cacheBuster.uniq
    }
  });


  // Private Tasks
  grunt.task.registerTask('default', 'Default Task', function() {
    console.log('There isn\'t any default task');
  });

  grunt.task.registerTask('angularWatch', [
    'newer:uglify:development',
    'newer:ngAnnotate:modules',
    'newer:jshint:frontend'
  ]);

  grunt.task.registerTask('sassWatch', [
    'newer:sass:development',
    'newer:postcss:development'
  ]);

  grunt.task.registerTask('angular', [
    'jscs',
    'uglify:development',
    'ngAnnotate',
    'jshint',
    'ngtemplates',
    'uglify:production',
    'angularI18n'
  ]);

  grunt.task.registerTask('angularI18n', [
    'shell:i18nXslxToJson'
  ]);

  grunt.task.registerTask('frontend', [
    'clean:frontendPublicDir',
    'angular',
    'sass',
    'postcss:deploy',
    'concat',
    'frontendIncludes'
  ]);

};
