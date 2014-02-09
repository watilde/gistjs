module.exports = function (files) {
  'use strict';
  var output = {};
  var fs = require('fs');
  files.forEach(function(file) {
    var content = fs.readFileSync(file, {encoding: 'utf8'});
    output[file] = {
      content: content
    };
  });
  return output;
};
