/**
 * grunt-contrib-copy
 *
 * expand: true 还不能轻易省略，否则会报错 todo：查看expand 解释
 *
 * 避免针对性拷贝，增加灵活性
 */
module.exports = {
  build: {
    cwd: '<%= pkg.path.src %>',
    src: [
      '**',
      // 样式部分
      '!assets/styles/**/*.scss'
    ],
    dest: '<%= pkg.path.build %>',
    expand: true
  },
  styles: {
    cwd: '<%= pkg.path.src %>',
    src: ['**/*.css'], // 包括 css.map
    dest: '<%= pkg.path.build %>',
    expand: true
  }

}