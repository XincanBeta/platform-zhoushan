/**
 * 用于 build
 * 
 */
module.exports = function(grunt) {
  //, 'cssmin'  , 'clean:styles'
  grunt.registerTask('styles', ['sass', 'copy:styles', 'autoprefixer']);
};