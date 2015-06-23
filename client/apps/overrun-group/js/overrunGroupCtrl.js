/**
 * 主控制器，并声明模块
 */
angular.module('app.overrun-group', [
  'ngToast',
  'ngAnimate',
  'angular-loading-bar',
  'cgBusy',
  'anchorSmoothScroll',
  'ui.bootstrap.datetimepicker'
])
  .controller('OverrunGroupCtrl', function ($scope, requestService, $state, $ocLazyLoad, $timeout) {
    // todo: 把 apps 应用目录提取成一个 env 服务，因为依赖性很强，让重构变得简单
    requestService.overrunGroupSidebarItems().success(function (menus) {
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

    /**
     * 可对自己特有的组件进行延迟加载
     * todo: ocLazyLoad isLoaded 无效
     */
    var apps = '../apps/overrun-group/'
    $ocLazyLoad.load([
      apps + 'js/overrunGroupItemDetailCtrl.js',
      apps + 'js/overrunGroupItemEditCtrl.js',
      apps + 'js/overrunGroupItemDetailPhotoCtrl.js',
      apps + 'js/overrunGroupPhotoDetailCtrl.js',
      apps + 'js/overrunGroupViewerCtrl.js',
      apps + 'js/overrunGroupViewerFullscreenCtrl.js'
    ])

    // todo: 抽取成通用的服务
    $scope.backToMyapp = function () {
      $("#platform-body").removeClass("is-expand");
      $timeout(function () {
        $state.go("myapp")
      }, 300)
    }
  })

