/**
 * grunt-contrib-sass 基于 ruby sass
 * files 数组形式：其中 dest 是字符串
 */

module.exports = {
  output: {
    options: {
      style: 'expanded'
    },
    files: [{
      expand: true,
      cwd: '<%= pkg.path.src %>/assets/styles',
      src: 'main.scss',
      dest: '<%= pkg.path.src %>/assets/styles',
      ext: '.css'
    },{
      expand: true,
      cwd: '<%= pkg.path.src %>/assets/styles',
      src: 'login.scss',
      dest: '<%= pkg.path.src %>/assets/styles',
      ext: '.css'
    }]
  }
}


/**
 * grunt-sass 基于 node-sass@beta 与最新的 rubysass 3.4 功能上非常接近
 * 默认生成 source map，并忽略 _ 开头的 scss 文件
 *
 * npm i node-sass@beta 安装 node版 libsass
 * grunt-sass ：用 grunt 方式来使用 node-sass
 *
 */
/*
 module.exports = {
 options: {
 sourceMap: true
 },
 web: {
 files: {
 'web/assets/styles/main.css': 'web/assets/styles/main.scss'
 }
 }
 }*/

