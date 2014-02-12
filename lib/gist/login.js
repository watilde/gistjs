module.exports = function () {
  'use strict';
  var util = require('util');
  var async = require('async');
  var https = require('https');
  var fs = require('fs');
  var host = 'api.github.com';
  var pkg = require('./pkg');
  var ua = pkg.name + '#' + pkg.version;
  var username = '';
  var password = '';
  var token = '';
  var twofa_code = '';

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
    callback(null);
    /**
     * @TODO Error: stty: stdin isn't a terminal
     *
     * exec('stty -echo', function (err, stdout, stderr) {
     * if (stderr) throw new Error(stderr);
     *   callback(null);
     * });
     **/
  }, function (callback) {
    var singleton = true;
    process.stdin.on('data', function (chunk) {
      if (!singleton) return;
      password = chunk;
      callback(null);
    });
  }, function (callback) {
    // Remove newline
    username = username.trim();
    password = password.replace(/[\n\r]*$/, '');
    callback(null);
    /**
     * @TODO Error: stty: stdin isn't a terminal
     *
     * exec('stty echo', function () {
     *   callback(null);
     * });
     **/
  }, function (callback) {
    var singleton = true;
    var request = function () {
      var body = JSON.stringify({
        scopes: ['gist'],
        note: pkg.name,
        note_url: pkg.homepage
      });
      var options = {
        hostname: host,
        port: 443,
        path: '/authorizations',
        method: 'POST',
        auth: username + ':' + password,
        headers: {
          'host': host,
          'Content-length': body.length,
          'Content-Type': 'application/json',
          'User-Agent': ua,
        }
      };
      if (twofa_code) {
        options['X-GitHub-OTP'] = twofa_code.trim();
      }
      var req = https.request(options, function(res) {
        res.body = '';
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          res.body += chunk;
        });
        res.on('end', function () {
          var res_body = JSON.parse(res.body);
          if (res.headers['x-github-otp']) {
            util.print('2-factor auth code: ');
            process.stdin.on('data', function (chunk) {
              if (!singleton) return;
              twofa_code = chunk;
              request();
            });
          } else if (!res_body.token) {
            throw res_body.message;
          } else {
            token = res_body.token;
            callback(null);
          }
        });
      });
      req.end(body);
    };
    request();
  }, function () {
    fs.writeFile(__dirname + '/../../.token', token, function (err) {
      if (err) throw err;
      console.log("Success! https://github.com/settings/applications");
      process.exit(0);
    });
  }]);
};
