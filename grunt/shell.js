module.exports = function(grunt, options) {
  'use strict';

  var task = {
    i18nXslxToJson : {
      command : [
        'node ./src/utils/excel/importI18n.js'
      ].join(' && ')
    },
    deployProduction : {
      command : [
        'grunt deploy --ENV=production'
      ].join(' && ')
    }
  };


  return task;
};
