module.exports = function(options) {
  'use strict';

  var ng = options.ng;
  var base = ng.dir;
  var _modules = ng.modules;

  var result = [
    base + 'libs/**/*.js',
    ng.input,
    base + 'constants/**/*.js',
    base + 'providers/**/*.js',
    base + 'configs/**/*.js',
    base + 'values/**/*.js',
    base + 'services/**/*.js',
    base + 'factories/**/*.js',
    base + 'filters/**/*.js',
    base + 'controllers/**/*.js',
    base + 'directives/**/*.js'
  ];

  for(var i = 0; i < _modules.length; i++) {
    var _base = base + _modules[i] + '/';

    result.push(
      _base + 'module.js',
      _base + 'configs/**/*.js',
      _base + '**/*Config.js',
      _base + 'constants/**/*.js',
      _base + '**/*Constant.js',
      _base + 'providers/**/*.js',
      _base + '**/*Provider.js',
      _base + 'values/**/*.js',
      _base + '**/*Value.js',
      _base + 'services/**/*.js',
      _base + '**/*Service.js',
      _base + 'factories/**/*.js',
      _base + '**/*Factory.js',
      _base + 'filters/**/*.js',
      _base + '**/*Filter.js',
      _base + 'controllers/**/*.js',
      _base + '**/*Ctrl.js',
      _base + 'directives/**/*.js',
      _base + '**/*Directive.js'
    );
  }

  return result;
};
