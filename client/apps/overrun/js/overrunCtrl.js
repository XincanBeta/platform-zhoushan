/**
 * 主控制器，并声明模块
 */
angular.module('app.overrun', [
  'angular-bootstrap-lightbox',
  'ngFileUpload',
  'ngToast',
  'angular-underscore',
  'ui.bootstrap.datetimepicker',
  'ngAnimate',
  'angular-loading-bar',
  'validation',
  'validation.rule',
  'cgBusy',
  'anchorSmoothScroll'
])
  .controller('OverrunCtrl', function ($scope, requestService, $state, $ocLazyLoad, $timeout) {
    // todo: 把 apps 应用目录提取成一个 env 服务，因为依赖性很强，就算改起来很方便

    requestService.overrunSidebarItems().success(function (menus) {
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
      apps + 'overrun/js/overrunEntityPanelCtrl.js',
      apps + 'overrun/js/overrunEntityPhotoCtrl.js',
      apps + 'overrun/js/overrunEditCtrl.js',
      apps + 'overrun/js/overrunDeleteCtrl.js',
      apps + 'overrun/js/overrunForfeit.js'
    ])

    // todo: 抽取成通用的服务
    $scope.backToMyapp = function () {
      $("#platform-body").removeClass("is-expand");
      $timeout(function(){
        $state.go("myapp")
      }, 300)
    }




  })
  // 修改 ui-bootstrap 中的 datepicker 的默认 date format 如 "2009-02-03T18:30:00.000Z" 造成的问题
  // fixme：重写无效
  .directive('datepickerPopup', function () {
    return {
      restrict: 'EAC',
      require: 'ngModel',
      link: function (scope, element, attr, controller) {
        //remove the default formatter from the input directive to prevent conflict
        controller.$formatters.shift();
      }
    }
  })
