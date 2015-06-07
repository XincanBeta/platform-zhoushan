angular.module('app')
  .controller('AppCtrl', function ($scope, $state, $ocLazyLoad, requestService, ngToast, userService, $document) {
    /*
     目录：
     保存用户信息
     延迟加载
     快捷方式
     退出
     消息提醒
     页面监听
     */

    /*--------------------------
     $ 保存用户信息
     --------------------------*/
    var parentScope = parent.angular.element('#client-index').scope();
    $scope.user = parentScope.getUser();
    userService.setUser($scope.user);

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


    /*--------------------------
     $ 延迟加载
     --------------------------*/
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
      '../assets/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',

      // 注：lightbox 已经废弃
      // todo ：学习 lightbox 是符合封装 loading 模块的
      //'../assets/lib/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.min.js',
      //'../assets/lib/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.min.css',
      // angular-bootstrap-lightbox 封装了 bootstrapLightbox
      //'../assets/components/angular-bootstrap-lightbox.js',

      '../assets/lib/angular-touch/angular-touch.min.js',
      '../assets/lib/angular-carousel/dist/angular-carousel.min.js',
      '../assets/components/angular-carousel.css',

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
        '../assets/components/angular-validation-rule.js' //未压缩
      ]
    }
    /*
     js 部分合并根据 grunt concat 任务
     css 部分暂不考虑
     */
    var lazyloadForBuild = [
      //'../assets/lib/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.min.css',
      '../assets/components/angular-carousel.css',
      '../assets/components/ngToast.css',
      '../assets/lib/ngtoast/dist/ngToast-animations.min.css',
      '../assets/lib/angular-busy/dist/angular-busy.min.css',
      '../assets/components/angucomplete-alt.css',
      'js/homeLazyLoad.js'
    ];

    $ocLazyLoad.load(lazyloadInParallel);
    $ocLazyLoad.load(lazyloadInSerie);
    //$ocLazyLoad.load(lazyloadForBuild);

    /*--------------------------
     $ 快捷方式
     --------------------------*/
    $scope.toggleAppsSwitcher = function () {
      $scope.isShowAppSwitcher = !$scope.isShowAppSwitcher;
      $scope.setAppSwitcherBlock()
    }

    $scope.setAppSwitcherBlock = function () {
      // 借助 ng-style 修改元素样式
      return {"display": "block"}
    }

    /*--------------------------
     $ 退出系统
     --------------------------*/
    $scope.exit = function () {
      parentScope.signOut();
    }




    /*--------------------------
     $ 消息提醒
     --------------------------*/
    // 从消息表中读取所有消息，并动态生成链接

    requestService.getNotilist().success(function(res){
      if (res.success) {
        $scope.notiCount = 0;
        $scope.notilist = res.data;
        for(var i=0; i<$scope.notilist.length; i++){
          if ($scope.notilist[i].unread) {
            $scope.notiCount++;
          }
        }
      }
    })

    $scope.toggleNotiPopup = function () {
      if ($scope.notiPopupShow == 'show') {
        $scope.notiPopupShow = ''
      } else {
        $scope.notiPopupShow = 'show'
      }
    }

    $scope.goNoti = function ($event, noti) {
      // 如果为当前路由，则不再跳转
      if ($state.current.name != noti.route) {
        $state.go(noti.route, {notid: noti.notid})
      }else{
        $state.go(noti.route, {notid: noti.notid}, {reload: true})
      }
      var parent = $($event.target).parent();
      if (parent.hasClass("unread")) {
        parent.removeClass("unread");
        // ajax 更新消息的状态，应用类型：overrun，提醒对象：业务员/领导
        $scope.notiCount--;
      }
      $scope.notiPopupShow = '';
    }




    /*--------------------------
     $ 页面监听
     --------------------------*/
    // 监听关闭 noit
    $document.bind('mousedown.noti', function (event) {
      var $target = $(event.target);
      if (!($target.parents(".noti-popup").length > 0
        || $target.parents("#platform-top-nav-noti").length > 0)) {
        $scope.notiPopupShow = '';
        $scope.$apply()
      }
    })

    $document.bind('mousedown.switcher', function (event) {
      var $target = $(event.target);
      if (!($target.parents(".app-switcher").length > 0
        || $target.parents("#platform-top-nav-switcher").length > 0)) {
        $scope.isShowAppSwitcher = false;
        $scope.$apply()
      }
    })




  });