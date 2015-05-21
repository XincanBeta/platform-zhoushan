/**
 * grunt-usemin 构建任务
 *
 *
 * 工作流：useminPrepare > concat > uglify > [cssmin] > filerev > usemin
 *
 * 实际替换模板上指定的资源文件上
 * 模板标记示例：
 * <!-- build:css assets/css/style.min.css -->
 * <!-- endbuild -->
 *
 * <!-- build:js assets/js/optimized.js -->
 * <!-- endbuild -->
 *
 * 标记格式：
 * build:<type> 加要替换的文件名
 *
 * 问题与方案
 * usemin 还不支持多个目录查找、不能处理条件注释的情况。可以用软链接
 *
 * html 要与useminPrepare 一致
 *
 *
 */
module.exports = {
  html: ['build/home/index.html'],
  options: {
    dirs: ['build/home']
  }


}


