module.exports = function () {
  'use strict';
  var inquirer = require("inquirer");
  var https = require('https');
  var fs = require('fs');
  var pkg = require('./pkg');
  var ua = pkg.name + '#' + pkg.version;
  var questions = [{
    type: "input",
    name: "username",
    message: "GitHub username:"
  }, {
    type: "password",
    name: "password",
    message: "GitHub password:"
  }];

  var get_token = function (credentials, twofa_code) {
    var body = JSON.stringify({
      scopes: ['gist'],
      note: pkg.name,
      note_url: pkg.homepage
    });
    var options = {
      hostname: 'api.github.com',
      port: 443,
      path: '/authorizations',
      method: 'POST',
      auth: credentials.username + ':' + credentials.password,
      headers: {
        'host': 'api.github.com',
        'Content-length': body.length,
        'Content-Type': 'application/json',
        'User-Agent': ua,
      }
    };
    if (twofa_code) {
      options.headers['X-GitHub-OTP'] = twofa_code;
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
          inquirer.prompt([{
            type: "password",
            message: "2-factor auth code:",
            name: "twofa_code"
          }], function(answer) {
            get_token(credentials, answer.twofa_code);
          });
        } else if (!res_body.token) {
          throw res_body.message;
        } else {
          write_token(res_body.token);
        }
      });
    });
    req.end(body);
  };

  var write_token = function (token) {
    fs.writeFile(__dirname + '/../../.token', token, function (err) {
      if (err) throw err;
      console.log("Success! https://github.com/settings/applications");
      process.exit(0);
    });
  };

  console.log('Obtaining OAuth2 access_token from github.');
  inquirer.prompt(questions, function(credentials) {
    get_token(credentials);
  });
};
