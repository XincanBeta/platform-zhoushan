/**
 * grunt-filerev
 *
 * 作用：files 里的指定的文件都会被重命名, 文件名前加入 md5 字符串，
 *    比如 css/app.css 被重命名为 css/ae35dd05.app.css
 *    但是 html (模板) 里的标签还是没有替换的。
 *
 * 重命名文件名来避免浏览器缓存，以内容来生成 md5码，如 global.41329f03.js
 *
 * 注：后续操作用 usemin 更新页面里的资源引用
 *
 */
module.exports = {
  options: {
    algorithm: 'md5',
    length: 8
  },
  build: {
    src: [
      'build/{,*/}*.js',
      'build/{,*/}*.css'
    ]
  }


}

