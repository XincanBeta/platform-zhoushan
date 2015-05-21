/**
 * grunt-contrib-cssmin
 *
 */
module.exports = {
  build: {
    options: {
      keepSpecialComments: 0
    },
    files: {
      // 其它 css 已经换上压缩版了
      '<%= pkg.path.build %>/assets/styles/main.css': ['<%= pkg.path.build %>/assets/styles/main.css'],
      '<%= pkg.path.build %>/assets/styles/login.css': ['<%= pkg.path.build %>/assets/styles/login.css']
    }
  }
}
