/**
 * grunt-contrib-watch 官网链接 https://github.com/gruntjs/grunt-contrib-watch
 * 对应的任务名为 watch
 * 功能描述：
 *    当文件发生添加、修改或删除时，会运行已经定义好的任务
 *
 * 配置：
 *    平级关系：files、tasks、options
 *
 * options.liverelaod: true
 *    自动重启服务器
 *
 * questions：
 * 目标不能嵌套，所以选取一两个目标来执行：'watch:stylesSass', 'watch:webload'，但问题是执行第一个 watch 就阻塞
 *
 * 易错点把 tasks 写成 task
 *
 * 顺序，把排除过的文件的放到下面
 *
 * 注：当有新文件时，要重启脚本
 */
module.exports = {
  options:{
    // 设置监听间隔
    //interval: 100,
    livereload: true
  },
  // 监听刷新
  livereload: {
    files: ['<%= pkg.path.src %>/**/*', '!<%= pkg.path.src %>/assets/scss/**/*.scss', '!<%= pkg.path.src %>/json/**/*'],
    options: {
      livereload: true
    }
  }
  ,
  // 监听编译
  stylesSass: {
    options: {
      livereload: true
    },
    // 注：之前包含了全部文件，其中 css 变化时又触发了 watch 导致频繁编译，所以仅包含 scss 文件
    files: ['<%= pkg.path.src %>/assets/styles/**/*.scss'],
    tasks: ['sass']
  }
}

/*

build: {
  /!*bower: {
   files: ['bower.json'],
   tasks: ['wiredep']
   },*!/
  copy: {
    //, '!source/!**!/!*.coffee', '!source/!**!/!*.jade'
    files: ['app/!**', '!app/!**!/!*.scss'],
      tasks: ['copy']
  },
  // 往往是对预编译文件
  stylesheets: {
    files: ['app/!**!/!*.scss'],
      tasks: ['stylesheets']
  },
  livereload: {
    options: {
      // 设置 livereload 端口，设置为 true，表示用默认端口号 35729
      // 在 connect 任务上设置端口号是没用的
      livereload: 4001
    },
    files: [
      'build/!**'
    ]
  }
}
*/
