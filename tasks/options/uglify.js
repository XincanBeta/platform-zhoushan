/**
 * 基于 grunt-contrib-uglify
 *
 * 针对脚本，压缩、合并到一个文件
 *
 * 属性说明：
 * mangle: false  #保留变量名，在内部上线时可以先保留变量名
 *
 * 注：如果用了 useminPrepare ，那么此处就省略。cssmin、concat 同理。
 *
 * usemin 目前仅能用于 index.html
 *
 * 用 uglify 对其余位置的项目脚本进行压缩
 *
 * uglify 哪些文件？
 * 针对 js （？）， 排除 vendor
 *
 *
 *
 1、用于 合并压缩
 files: {
      'build/main.min.js': ['build/** / *.js']
  }

  压缩过的再压缩就会报错？
 '!home/js/lazyload.js'

 */


module.exports = {
  build: {
    options: {
      //mangle: false
    },
    files: [
      {
        expand: true,
        cwd: '<%= pkg.path.build %>/',
        // todo：已压缩过的文件再压缩，会报错？
        // home/js/homeLazyLoad.js
        src: ['**/*.js', '!assets/lib/**', '!home/js/vendors.js'],
        dest: '<%= pkg.path.build %>/',
        ext: '.js'
      }
    ]
  }
}
