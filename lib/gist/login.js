module.exports = function (credentials) {
  'use strict';
  var util = require('util');
  var async = require('async');
  var https = require('https');
  var fs = require('fs');
  var host = 'api.github.com';
  var pkg = require(__dirname + '/../../package.json');
  var ua = pkg.name + '#' + pkg.version;
  var username = '';
  var password = '';
  var token = '';

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
    username = username.slice(0, -1);
    password = password.slice(0, -1);
    callback(null);
    /**
     * @TODO Error: stty: stdin isn't a terminal
     *
     * exec('stty echo', function () {
     *   callback(null);
     * });
     **/
  }, function (callback) {
    var body = JSON.stringify({
      scopes: ['gist'],
      note: pkg.description,
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
    var req = https.request(options, function(res) {
      res.body = '';
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        res.body += chunk;
      });
      res.on('end', function () {
        var res_body = JSON.parse(res.body);
        if (!res_body.token) {
          console.error(res_body.message);
          process.exit(1);
        } else {
          token = res_body.token;
          callback(null);
        }
      });
    });
    req.end(body);
  }, function (callback) {
    fs.writeFile(__dirname + '/../../.gist', token, function (err) {
      if (err) throw err;
      console.log("Success! https://github.com/settings/applications");
    });
  }]);
};
