// 对 css 进行检测确保兼容性前缀，做最后的检查
module.exports = {
  dev: {
    expand: true,
    cwd: '<%= pkg.path.src %>',
    src: ['**/*.css'],
    dest: '<%= pkg.path.src %>'
  },
  build: {
    expand: true,
    cwd: '<%= pkg.path.build %>',
    src: ['**/*.css'],
    dest: '<%= pkg.path.build %>'
  }

}