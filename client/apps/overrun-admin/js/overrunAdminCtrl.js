/**
 * 主控制器，并声明模块
 */
angular.module('app.overrun-admin', [])
  .controller('OverrunAdminCtrl', function ($scope, requestService, $state, $ocLazyLoad, $timeout) {
    requestService.overrunAdminSidebarItems().success(function (menus) {
      $scope.menus = menus;
      $scope.select(menus[0])
    })

    $scope.select = function (menu) {
      $scope.selected = menu
      $state.go(menu.routestate);
    }

    $scope.isSelected = function (menu) {
      return $scope.selected == menu ? "is-select" : "";
    }

    // todo: 抽取成通用的服务
    $scope.backToMyapp = function () {
      $("#platform-body").removeClass("is-expand");
      $timeout(function () {
        $state.go("myapp")
      }, 300)
    }

    /**
     * 可对自己特有的组件进行延迟加载
     * todo: ocLazyLoad isLoaded 无效
     * 有的部分在路由中加载了，就不要重复加载了
     */
    var apps = '../apps/overrun-admin/'
    $ocLazyLoad.load([
      apps + 'js/overrunAdminDeptEditCtrl.js',
      apps + 'js/overrunAdminDeptDetailCtrl.js',
      apps + 'js/overrunAdminDeptDeleteCtrl.js',

      apps + 'js/overrunAdminUserEditCtrl.js',
      apps + 'js/overrunAdminUserDetailCtrl.js',

      apps + 'js/overrunAdminDictEditCtrl.js',
      apps + 'js/overrunAdminDictDeleteCtrl.js',

      apps + 'js/overrunAdminItemDetailCtrl.js',
      apps + 'js/overrunAdminItemEditCtrl.js',
      apps + 'js/overrunAdminItemDetailPhotoCtrl.js',
      apps + 'js/overrunAdminForfeitService.js',
      apps + 'js/overrunAdminViewerCtrl.js',
      apps + 'js/overrunAdminViewerFullscreenCtrl.js'

    ])





  })

