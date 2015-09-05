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

    result.push(_base + 'module.js');
    result.push(_base + '**/models/**/*.js');
    result.push(_base + '**/services/**/*.js');
    result.push(_base + '**/directives/**/*.js');
    result.push(_base + '**/*Config.js');
    result.push(_base + '**/*Constant.js');
    result.push(_base + '**/*Provider.js');
    result.push(_base + '**/*Value.js');
    result.push(_base + '**/*Service.js');
    result.push(_base + '**/*Factory.js');
    result.push(_base + '**/*Filter.js');
    result.push(_base + '**/*Ctrl.js');
    result.push(_base + '**/*Directive.js');
  }

  return result;
};
