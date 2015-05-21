/**
 * grunt-ng-annotate
 * 构建任务
 *
 * expand:true 在 files 模式下是必须项
 *
 * 在useminPrepare 之前先遍历 build 下的 js
 *
 *
 */
module.exports = {
  options: {
    singleQuotes: true
  },
  build: {
    files:[{
      expand: true,
      src: ['<%= pkg.path.build %>/**/*.js', '!<%= pkg.path.build %>/assets/lib/**/*']
    }]

  }
}