/**
 * grunt-contrib-concat
 * concat 的目录统一为 .tmp/concat
 *
 * 注：引入的一定是压缩的版本，所以开发阶段是可以未压缩的
 */

//       '<%= pkg.path.build %>/assets/lib/angular-loading-bar/build/loading-bar.min.js',

module.exports = {
  build: {
    src: [
      // todo：换上压缩版
      '<%= pkg.path.build %>/assets/components/slider.js',
      '<%= pkg.path.build %>/assets/components/util.js',
      // 已压缩
      '<%= pkg.path.build %>/assets/lib/angular-locale_zh-cn/angular-locale_zh-cn.js',
      '<%= pkg.path.build %>/assets/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',

      //'<%= pkg.path.build %>/assets/lib/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.min.js',
      //'<%= pkg.path.build %>/assets/components/angular-bootstrap-lightbox.js',
      '<%= pkg.path.build %>/assets/lib/angular-touch/angular-touch.min.js',
      '<%= pkg.path.build %>/assets/lib/angular-carousel/dist/angular-carousel.min.js',

      '<%= pkg.path.build %>/assets/lib/ng-file-upload/ng-file-upload.min.js',
      '<%= pkg.path.build %>/assets/components/paging.min.js',
      '<%= pkg.path.build %>/assets/lib/mathjs/dist/math.min.js',
      '<%= pkg.path.build %>/assets/lib/angular-busy/dist/angular-busy.min.js',
      '<%= pkg.path.build %>/assets/components/anchorSmoothScroll.min.js',

      '<%= pkg.path.build %>/assets/components/car-city.min.js',
      '<%= pkg.path.build %>/assets/components/angucomplete-alt.js',


      // 串行
      '<%= pkg.path.build %>/assets/lib/underscore/underscore-min.js',
      //'<%= pkg.path.build %>/assets/lib/underscore.string/dist/underscore.string.min.js',
      '<%= pkg.path.build %>/assets/lib/angular-underscore/angular-underscore.min.js',
      '<%= pkg.path.build %>/assets/lib/bootstrap-ui-datetime-picker/dist/datetime-picker.min.js',
      '<%= pkg.path.build %>/assets/components/datetime-picker.tpls.min.js',
      '<%= pkg.path.build %>/assets/lib/moment/min/moment.min.js',
      '<%= pkg.path.build %>/assets/components/moment.locale.zh-cn.min.js',
      '<%= pkg.path.build %>/assets/lib/angular-validation/dist/angular-validation.min.js',
      '<%= pkg.path.build %>/assets/components/angular-validation-rule.js' // 未压缩
    ],
    dest: '<%= pkg.path.build %>/home/js/homeLazyLoad.js'
  }
}
