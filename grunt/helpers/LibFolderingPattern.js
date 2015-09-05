module.exports = function(options) {
  'use strict';
  var vendor = options.vendor;
  var dir = vendor.dir;

  var applicationLib = (function() {
    var dependencies = vendor.js.applicationDependenciesMin;
    var res = [];

    for(var i = 0; i < dependencies.length; i++) {
      var file = dependencies[i];
      res.push(file);
    }

    return res;
  }).call(this);

  var angularLib = (function() {
    var dependencies = vendor.js.angularDependenciesMin;
    var res = [];

    for(var i = 0; i < dependencies.length; i++) {
      var file = dependencies[i];
      res.push(file);
    }

    return res;
  }).call(this);


  return {
    applicationLib: applicationLib,
    angularLib: angularLib
  };
};
