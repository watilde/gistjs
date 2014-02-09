module.exports = (function () {
  'use strict';
  var fs = require('fs');
  try {
    return fs.readFileSync(
      __dirname + '/../../.token',
      {encoding: 'utf8'}
    );
  } catch (e) {
    return false;
  }
}());
