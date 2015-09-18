var fs = require('fs');

module.exports = function(grunt, options) {
  'use strict';

  var frontend = options.frontend;
  var libFilesPattern = require(__dirname + '/helpers/LibFolderingPattern.js')(options.frontend);


  var task = {
    frontendLibs: {
      options: {
        stripBanners: true
      },
      files: [
        {
          nonull: true,
          src: frontend.vendor.angular,
          dest: frontend.vendor.angularDest
        },
        {
          nonull: true,
          src: frontend.vendor.angularMin,
          dest: frontend.vendor.angularMinDest
        },
        {
          nonull: true,
          src: libFilesPattern.applicationLib,
          dest: frontend.build.applicationLib
        },
        {
          nonull: true,
          src: libFilesPattern.angularLib,
          dest: frontend.build.angularLib
        },
        {
          nonull: true,
          src: [
            frontend.build.angularLib,
            frontend.vendor.angularMinDest,
            frontend.build.applicationLib,
            frontend.build.jsMin,
            frontend.build.tpls
          ],
          dest: frontend.build.jsPack
        }
      ]
    },
    frontendBanners: {
      options: {
        stripBanners: true,
        banner: frontend.banner
      },
      files: [
        {
          nonull: true,
          src: [frontend.build.cssLib, frontend.build.cssMin],
          dest: frontend.build.cssMin
        },
        {
          nonull: true,
          src: frontend.build.css,
          dest: frontend.build.css
        },
        {
          nonull: true,
          src: frontend.build.tpls,
          dest: frontend.build.tpls
        },
        {
          nonull: true,
          src: frontend.build.jsPack,
          dest: frontend.build.jsPack
        },
        {
          nonull: true,
          src: frontend.build.jsMin,
          dest: frontend.build.jsMin
        },
        {
          nonull: true,
          src: frontend.build.applicationLib,
          dest: frontend.build.applicationLib
        },
        {
          nonull: true,
          src: frontend.build.angularLib,
          dest: frontend.build.angularLib
        },
        {
          nonull: true,
          src: frontend.build.js,
          dest: frontend.build.js
        }
      ]
    }
  };


  return task;
};
