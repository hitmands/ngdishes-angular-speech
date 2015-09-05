(function() {
  'use strict';

  function sanitize(string) {

    return string
      .replace(/(\r\n|\n|\r)/gm, "")
      ;
  }

  var
    _ = require('lodash'),
    path = require('path'),
    fs = require('fs'),
    XLSX = require('xlsx'),

    root = path.join(__dirname, '..', '..', '..'),
    configs = require(path.join(root, 'config', 'default.frontend.js')),
    outputDir = path.join(root, configs.i18n.jsonsOutputDir),
    inputFilename = path.join(__dirname, 'i18n.xlsx'),

    PAGE_NAME_SHEET = 'TRANSLATIONS',
    INDENT_OUTPUT = 0,
    COL_ID = 'B',
    COL_DESCRIPTION = 'A',

    workbook = XLSX.readFile(inputFilename),
    worksheet = workbook.Sheets[PAGE_NAME_SHEET],


    labels = {},
    stack = {
      'C' : {
        'lang' : 'it',
        'data' : {}
      },
      'D' : {
        'lang' : 'en',
        'data' : {}
      }
    }
    ;


  (function() {
    /**
     * @description Collecting IDs
     */
    for(var z in worksheet) {
      if(worksheet.hasOwnProperty(z)) {
        var row = Number(z.substring(1)), col = z.substring(0, 1);

        if(z[0] === '!') {
          continue;
        }

        if(col == COL_ID) {
          labels[row] = sanitize(worksheet[z].v.toString());
        }

      }
    }
  }).call(this);


  (function() {
    /**
     * @description Collecting Values
     */
    for(var z in worksheet) {
      if(worksheet.hasOwnProperty(z)) {
        var row = z.substring(1), col = z.substring(0, 1);

        if(z[0] === '!' || col == COL_DESCRIPTION || col == COL_ID) {
          continue;
        }

        stack[col].data[labels[row]] = "";

        if(labels[row]) {
          stack[col].data[labels[row]] = sanitize(worksheet[z].v.toString());
        }

      }
    }
  }).call(this);


  (function() {
    /**
     * @description SAVING JSON FILES
     */
    for(var key in stack) {
      if(stack.hasOwnProperty(key)) {

        if(!stack[key] || !stack[key].lang) {
          console.log('key or stack[key].lang in stack not found; key = ', key);
          continue;
        }

        var outputFilename = stack[key].lang + '.json';
        var _path = path.join(outputDir, outputFilename);
        var _data = JSON.stringify(stack[key].data, null, INDENT_OUTPUT);

        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, '0777');
        }

        try {
          fs.writeFileSync(_path, _data, { flags: 'w' });
          console.log("Wrote", outputFilename, "- File saved in: " + _path);
        } catch( error ) {
          console.log("Unable to Write", outputFilename, "- in: ", _path);
          console.log(error);
          console.log('\n');
        }

      }
    }

  }).call(this);



})();
