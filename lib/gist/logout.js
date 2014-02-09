module.exports = function (credentials) {
  'use strict';
  var file = __dirname + '/../../.gist';
  require('child_process').exec('rm ' + file, function () {
    console.log('Remove OAuth2 access_token from local.');
  });
};
