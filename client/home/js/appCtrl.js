angular.module('app')
  .controller('AppCtrl', function ($scope, $state, $ocLazyLoad, requestService, ngToast) {

    requestService.homeSidebarItems().success(function (items) {
      $scope.items = items;
      $scope.select(items[1])
    })

    $scope.select = function (item) {
      $scope.selected = item
      $state.go(item.routestate);
    }

    $scope.isSelected = function (item) {
      return $scope.selected == item ? "active" : "";
    }

    $scope.toggleShowAccountItem = function () {
      //$scope.accountItemShown = ($scope.accountItemShown != true);
    }

    /**
     * home 延迟加载的部分
     *
     * 1）ocLazyLoad 会对主模块的组件自动注入，但对新的模块要手动加载
     * 2）样式部分要单独合并
     *
     * 注：
     *  1）在 grunt concat 任务引入才是压缩的版本，所以此处开发阶段可以是未压缩的
     *  2）不改动源文件，而是另建文件扩展
     *
     *  todo:如何管理依赖
     */
    var lazyloadInParallel = [
      '../assets/components/slider.js',
      '../assets/components/util.js',
      '../assets/lib/angular-locale_zh-cn/angular-locale_zh-cn.js',
      '../assets/lib/angular-bootstrap/ui-bootstrap-tpls.min.js', //
      // todo ：学习 lightbox 是符合封装 loading 模块的
      '../assets/lib/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.min.js',
      '../assets/lib/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.min.css',
      // angular-bootstrap-lightbox 封装了 bootstrapLightbox
      '../assets/components/angular-bootstrap-lightbox.js',
      '../assets/lib/ng-file-upload/ng-file-upload.min.js',
      // todo：toast 依赖 sanitize，查明 sanitize 的作用
      // 延迟加载 ngToast css，js 在 home/index.html 中直接加载掉，因为指令要放在最外层
      '../assets/components/ngToast.css', // min
      '../assets/lib/ngtoast/dist/ngToast-animations.min.css',
      // paging 依赖 bootstrap paging 样式
      // 注：bower 安装的 paging 默认没有 min 版
      '../assets/components/paging.min.js',
      '../assets/lib/mathjs/dist/math.min.js',
      '../assets/lib/angular-busy/dist/angular-busy.min.js',
      '../assets/lib/angular-busy/dist/angular-busy.min.css',
      '../assets/components/anchorSmoothScroll.min.js',
      '../assets/components/car-city.min.js',
      // angucomplete-alt.js 反馈提示
      '../assets/components/angucomplete-alt.min.js',
      '../assets/components/angucomplete-alt.css'
    ]
    /*
      串行加载解决依赖关系
    */
    var lazyloadInSerie = {
      serie: true,
      files: [
        // underscore
        // angular-score 放到第三层加载，因为一旦 angular-underscore 与 underscore 有依赖，所以确保 underscore 先加载
        '../assets/lib/underscore/underscore-min.js',
        '../assets/lib/angular-underscore/angular-underscore.min.js',
        '../assets/lib/bootstrap-ui-datetime-picker/dist/datetime-picker.min.js',
        // 用自己的模板
        '../assets/components/datetime-picker.tpls.min.js',
        '../assets/lib/moment/min/moment.min.js',
        '../assets/components/moment.locale.zh-cn.min.js',
        '../assets/lib/angular-validation/dist/angular-validation.min.js',
        /*1) date 验证依赖 moment
          2) validation-submit 依赖 input[name] */
        '../assets/components/angular-validation-rule.js'
      ]
    }
    /*
      js 部分合并根据 grunt concat 任务
      css 部分暂不考虑
    */
    var lazyloadForBuild = [
      '../assets/lib/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.min.css',
      '../assets/components/ngToast.css',
      '../assets/lib/ngtoast/dist/ngToast-animations.min.css',
      '../assets/lib/angular-busy/dist/angular-busy.min.css',
      '../assets/components/angucomplete.css',
      'js/homeLazyLoad.js'
    ];

    $ocLazyLoad.load(lazyloadInParallel);
    $ocLazyLoad.load(lazyloadInSerie);
    //$ocLazyLoad.load(lazyloadForBuild);

    // 快捷方式
    $scope.toggleAppsSwitcher = function () {
      $scope.isShowAppSwitcher = !$scope.isShowAppSwitcher;
      $scope.setAppSwitcherBlock()
    }

    $scope.setAppSwitcherBlock = function(){
      // 借助 ng-style 修改元素样式
      return {"display": "block"}
    }

    var parentScope = parent.angular.element('#clientIndex').scope();
    // 退出系统
    $scope.exit = function(){
      parentScope.signOut();
    }




  });