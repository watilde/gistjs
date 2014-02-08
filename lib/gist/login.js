module.exports = function (credentials) {
  var util = require('util');
  var async = require('async');
  var https = require('https');
  var host = 'api.github.com';
  var pkg = require(__dirname + '../../../package.json');
  var ua = 'gistjs#' + pkg.version
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
    callback(null);
    /**
     * @TODO Error: stty: stdin isn't a terminal
     * exec('stty -echo', function (err, stdout, stderr) {
     * if (stderr) throw new Error(stderr);
     * callback(null);
     * });
     **/
  }, function (callback) {
    var singleton = true;
    if (!singleton) return;
    process.stdin.on('data', function (chunk) {
      password = chunk;
      callback(null);
    });
  }, function (callback) {
    callback(null);
    /**
     * @TODO Error: stty: stdin isn't a terminal
     * exec('stty echo', function () {
     * callback(null);
     * });
     **/
  }, function (callback) {
    var body = JSON.stringify({
      scopes: 'gist',
      note: pkg.description,
      note_url: pkg.homepage
    });
    var options = {
      hostname: host,
      port: 443,
      path: 'api/v3/authorizations',
      method: 'POST',
      auth: username + ':' + password,
      headers: {
        'host': host,
        'Content-length': body.length,
        'Content-Type': 'application/json',
        'User-Agent': ua
      }
    };
    var req = https.request(options, function(res) {
      res.body = '';
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        res.body += chunk;
      });
      res.on('end', function () {
        console.log(res.body);
      });
    });
    req.end(body);
  }]);
};
