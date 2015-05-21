/**
 * grunt-usemin 的前置构建任务 useminPrepare
 *
 * 指定要处理的 html，后台完成对该 html 中 block 注释划定的资源范围进行 concat、uglify、cssmin 的配置
 * 注：在执行任务时，只需调用 concat、uglify、cssmin 的任务即可，示例：
 grunt.registerTask('build', [
 'useminPrepare',
 'concat',
 'uglify',
 'usemin'
 ]);
 *
 * concat 默认放入到 .tmp/concat 下
 *
 * 在 uglify 阶段消耗时间最长
 * 'uglifyjs'
 *
 * 第一种解决方案：
 * 对于 angular ，build 时，将首页资源替换成压缩版，然后构建时就不用 useminPrepare 的 uglifyjs，这样可以顺利运行
 *
 *
 * 目前用 useminPrepare 仅针对首页优化
 *
 */
module.exports = {
  html: ['<%= pkg.path.build %>/home/index.html'],
  options: {
    dest: '<%= pkg.path.build %>/home',
    flow: {
      html: {
        steps: {
          js: ['concat']
          //,
          //css: ['cssmin']
        },
        post: {}
      }
    }
  }

}