module.exports = function () {
  'use strict';
  var file = __dirname + '/../../.token';
  require('child_process').exec('rm ' + file, function () {
    console.log('Remove OAuth2 access_token from local.');
  });
};
