(function () {
  'use strict';
  var argv = process.argv;
  var main  = require('./main');

  if(argv[2]) {
    switch (argv[2]) {
      case '--login':
        if (argv.length === 3) {
          main.login();
          break;
        }
      case '--logout':
        if (argv.length === 3) {
          main.logout();
          break;
        }
    default:
      brek;
    }
  }
}());
