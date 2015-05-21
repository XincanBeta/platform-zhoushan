/**
 * grunt-contrib-clean
 *
 * 三个目标：build、stylesheets、scripts
 *
 *
 */
module.exports = (function () {
  return {
    build: {
      src: ['<%= pkg.path.build %>']  // 删除目录
    }
  }
})()


/*



 ,
 styles: {
 src: ['build/** /*.css', '!build/*.min.css']
 },
 scripts: {
 src: ['build/** /*.js', '!build/*.min.js']
 }





 */