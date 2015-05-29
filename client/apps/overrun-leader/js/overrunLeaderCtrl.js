/**
 * 主控制器，并声明模块
 */
angular.module('app.overrun-leader', [
  'ngToast',
  'ngAnimate',
  'angular-loading-bar',
  'cgBusy',
  'anchorSmoothScroll'
])
  .controller('OverrunLeaderCtrl', function ($scope, requestService, $state, $ocLazyLoad, $timeout) {
    // todo: 把 apps 应用目录提取成一个 env 服务，因为依赖性很强，让重构变得简单
    requestService.overrunLeaderSidebarItems().success(function (menus) {
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
    var apps = '../apps/'
    $ocLazyLoad.load([
      apps + 'overrun/js/overrunLeaderTodoCtrl.js'
    ])

    // todo: 抽取成通用的服务
    $scope.backToMyapp = function () {
      $("#platform-body").removeClass("is-expand");
      $timeout(function () {
        $state.go("myapp")
      }, 300)
    }
  })

