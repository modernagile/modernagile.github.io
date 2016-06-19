module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    qunit: {
      all: ['./*.html']
    },
    watch: {
      files: ['../js/*.js', './*.html', './*.js'],
      tasks: ['qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.registerTask('default', ['qunit']);
  grunt.loadNpmTasks('grunt-contrib-watch');
};
