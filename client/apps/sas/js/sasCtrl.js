/**
 * 主控制器，并声明模块
 */
//'ui.bootstrap', 'brantwills.paging'
angular.module('app.sas', [])
  .controller('SasCtrl', function ($scope, requestService, $state, $timeout, $ocLazyLoad) {
    $scope.backToMyapp = function () {
      $("#platform-body").removeClass("is-expand");
      $timeout(function () {
        $state.go("myapp")
      }, 300)
    }

  });
