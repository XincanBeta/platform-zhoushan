module.exports = function (grunt) {
  grunt.registerTask('dev', [
    'sass',
    // grunt-connect-proxy 的配置是嵌在 connect 配置中的，并且以如下形式调用：
    // 此处 watch 是必须的，是它让 connect 保持连续
    'configureProxies:server',
    'connect:livereload',
    'watch'
  ]);
}

