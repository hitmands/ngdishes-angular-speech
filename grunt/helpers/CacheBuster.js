module.exports = function(configs) {
  'use strict';

  var path = require('path');
  var fs = require('fs');

  var _configs = configs.cacheBuster;
  var unique = _configs.uniq;


  function applyCacheBusterToQueryString(_path) {
    return _path + '?' + unique;
  }


  return {
    toQueryString: applyCacheBusterToQueryString,
  };
};
