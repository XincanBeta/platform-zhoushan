/**
 * 用于 build
 *
 */
module.exports = function(grunt){

  grunt.registerTask('scripts', ['uglify', 'clean:scripts']);

}