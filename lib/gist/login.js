module.exports = function (credentials) {
  var util = require('util');
  var async = require('async');
  var https = require('https');
  var exec = require('child_process').exec;
  var host = 'api.github.com/api/v3';
  var username = '';
  var password = '';

  async.waterfall([function (callback) {
    console.log('Obtaining OAuth2 access_token from github.');
    callback(null);
  }, function (callback) {
    var singleton = true;
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    util.print('GitHub username: ');
    process.stdin.on('data', function (chunk) {
      if (!singleton) return;
      username = chunk;
      singleton = false;
      callback(null);
    });
  }, function (callback) {
    util.print('GitHub password: ');
    exec('stty -echo', function (err, stdout, stderr) {
      if (stderr) throw new Error(stderr);
      callback(null);
    });
  }, function (callback) {
    var singleton = true;
    if (!singleton) return;
    process.stdin.on('data', function (chunk) {
      password = chunk;
      callback(null);
    });
  }, function (callback) {
    console.log('end');
    exec('stty echo', function () {
      callback(null);
    });
  }, function (callback) {
    var options = {
      hostname: host,
      port: 443,
      path: '/authorizations',
      method: 'GET'
    };
    process.exit();
  }]);
};
