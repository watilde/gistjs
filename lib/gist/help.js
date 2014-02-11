module.exports = function () {
  'use strict';
  var message = '';
  message += 'Usage:\n';
  message += '    gistjs files              Upload the contents\n';
  message += 'Options:\n';
  message += '    -d <text>                 Add a description\n';
  message += '    -a                        Upload gists anonymously\n';
  message += '    -p                        Make the gist private\n';
  message += 'Authentication:\n';
  message += '    gistjs --login            Get an OAuth2 token\n';
  message += '    gistjs --logout           Remove OAuth2 token\n';
  message += '    gistjs --save <token>     Save other token\n';
  message += 'Others:\n';
  message += '    gistjs --help             See this message\n';
  console.log(message);
};
