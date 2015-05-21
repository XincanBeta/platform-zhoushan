/**
 *
 * 压缩图片
 * appCtrl 要更改代码来切换 build 环境
 */
module.exports = function (grunt) {
  // 先不用 build，直接切换生产环境测试一遍
  grunt.registerTask('build', [
    'clean:build',
    'copy:build',
    'autoprefixer:build',
    'ngAnnotate',
    'useminPrepare',
    'concat',
    'usemin',
    'uglify',
    'cssmin',
    'htmlmin'
  ]);

}
