module.exports = function (token) {
  'use strict';
  var fs = require('fs');
  fs.writeFile(__dirname + '/../../.token', token, function (err) {
    if (err) throw err;
    console.log("Saved");
  });
};
