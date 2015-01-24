module.exports = function (files) {
  'use strict';
  var output = {};
  var fs = require('fs');
  files.forEach(function(file) {
    fs.exists(file, function(exists) {
        if(!exists) {
            console.log('Error! File:' + file + ' does not existing.')
            process.exit(1);
            return;
        }
        var content = fs.readFileSync(file, {encoding: 'utf8'});
        output[file] = {
            content: content
        };
    });
  });
  return output;
};
