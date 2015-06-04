/**
 * grunt-contrib-connect 官网链接 https://github.com/gruntjs/grunt-contrib-connect
 * 对应的任务名为 connect （任务名并不具有唯一性，同种功能也可能具有相同任务名）
 * connect 是具有`完整功能`的静态文件服务器，一般地 connect 会随着 grunt 执行结束而结束，解决办法有两种：
 *  1）grunt connect:目标名（target）:keepalive
 *  2）在其后添加 watch 任务
 *
 * 代码结构：
 *    [options]
 *    target
 *        options
 *
 * 选项必须在 options 项中配置，否则无效!
 * options 说明：
 * useAvailablePort: true
 *    当 port 指定的值不可用时，会切换下一个可用的端口
 * hostname: '*'
 *    默认是 '0.0.0.0' 禁止访问本机外的服务器，当设置为 '*' 就能允许服务器访问外部
 * open: true
 *    启动服务器后自动从浏览器中打开
 * keepalive: true
 *    让服务器持续运行，一般不在 options 中设置，而是跟一个 watch ，来保持服务器持续
 * livereload: true/端口号
 *    服务器在页面中插入一段 live reload 的脚本；但同时需要借助 grunt-contrib-watch 等类似任务在监测到文件变化时能重启服务器
 *    !! 如果要更改 livereload 端口号，那么要同时修改 watch 中的端口号，即两边端口要保持一致
 */
module.exports = {
  options: {
    port: 9000,
    useAvailablePort: true,
    hostname: 'localhost', //  '192.168.1.104'
    livereload: true, // 刷新，与 watch 搭配使用能达到文件变化自动刷新的效果
    open: true,
    // 总结：手动更改的地方有 2 处：1）在这里(如果要在本地调试)  2）home/js/appCtrl.js 切换 lazyloadForBuild
    base: '<%= pkg.path.src %>'
  },
  // 任务调用方式： configureProxies:server
  server: {
    proxies: [{
      context: '/api/', // 后端的 api，如 http://127.0.0.1:9000/api/
      host: '<%= pkg.proxy.ip %>', // 要转发到的远端服务器
      port: '<%= pkg.proxy.port %>', // 远端服务器端口
      // 建议配置为true，这样它转发时就会把host带过去，比如www.ngnice.com，如果远端服务器使用了虚拟主机的方式配置，该选项通常是必须的。
      changeOrigin: true
      /*,
      rewrite: {
        '^/api/': '/cxcf/api/' // 地址映射策略，从context开始算，把前后地址做正则替换，如果远端路径和context相同则不用配置。
      }*/
    },{
      context: '/fileUpLoad/', // 访问服务器上的文件
      host: '<%= pkg.proxy.ip %>',
      port: '<%= pkg.proxy.port %>',
      changeOrigin: true
    }]
  },
  livereload: {
    options: {
      middleware: function (connect, options) {
        if (!Array.isArray(options.base)) {
          options.base = [options.base];
        }

        // Setup the proxy
        var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

        // Serve static files.
        options.base.forEach(function (base) {
          middlewares.push(connect.static(base));
        });

        // Make directory browse-able.
        var directory = options.directory || options.base[options.base.length - 1];
        middlewares.push(connect.directory(directory));

        return middlewares;
      }
    }
  }
}