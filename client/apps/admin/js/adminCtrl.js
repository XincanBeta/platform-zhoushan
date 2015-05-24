/**
 * 主控制器，并声明模块
 */
angular.module('app.admin', [])
  .controller('AdminCtrl', function ($scope, requestService, $state, $ocLazyLoad, $timeout) {
    requestService.adminSidebarItems().success(function (menus) {
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
     * 有的部分在路由中加载了，就不要重复加载了
     */
    var apps = '../apps/'
    $ocLazyLoad.load([
      apps + 'admin/js/adminDeptDetailCtrl.js'
    ])



  })

