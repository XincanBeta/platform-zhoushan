/**
 * 构建，并运行
 */

module.exports = function (grunt) {
  grunt.registerTask('serve', [
    // 灵活的注释 build 任务
    'build',
    // 此处 watch 是必须的，是它让 connect 保持连续
    'configureProxies:server',
    // 我看到 src/index.html 中的 style 标签被 livereload 脚本化后无法显示了
    //'connect:livereload',
    'watch'
  ]);
}


