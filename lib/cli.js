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
      var files = [];
      var is_private = false;
      var is_anonymous = false;
      var description = '';
      if (argv.indexOf('-p') !== -1) {
        is_private = true;
        argv.splice(argv.indexOf('-p'), 1);
      }
      if (argv.indexOf('-a') !== -1) {
        is_anonymous = true;
        argv.splice(argv.indexOf('-a'), 1);
      }
      if (argv.indexOf('-d') !== -1) {
        description = argv[argv.indexOf('-d') + 1];
        argv.splice(argv.indexOf('-d'), 2);
      }
      files = argv.slice(2);
      main.create(files, description, is_private, is_anonymous);
      break;
    }
  }
}());
