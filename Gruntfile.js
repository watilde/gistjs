module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    watch: {
      all: {
        files: ['lib/*.js', 'lib/**/*.js'],
        tasks: ['jshint']
      }
    },
    jshint: {
      options: {
        strict: true,
        indent: 2,
        maxlen: 80,
        unused: true,
        node: true,
        devel: true,
      },
      app: ['lib/*.js', 'lib/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('test', ['jshint']);
};
