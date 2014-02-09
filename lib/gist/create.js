module.exports = function (files, description, is_private, is_anonymous) {
  var https = require('https');
  var token = require('./token');
  var pkg = require('./pkg');
  var files = require('./files')(files);

  var body = JSON.stringify({
    'description': description,
    'public': !is_private,
    'files': files
  });
  var options = {
    hostname: 'api.github.com',
    port: 443,
    path: '/gists',
    method: 'POST',
    headers: {
      'host': 'api.github.com',
      'Content-length': body.length,
      'Content-Type': 'application/json',
      'User-Agent': pkg.name + '#' + pkg.version,
    }
  };
  if (token && !is_anonymous) {
    options.headers['Authorization'] =  'token ' + token;
  }

  var req = https.request(options, function(res) {
    res.body = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      res.body += chunk;
    });
    res.on('end', function () {
      var res_body = JSON.parse(res.body);
      console.log('Success! ' + res_body.html_url);
    });
  });
  req.end(body);
};
