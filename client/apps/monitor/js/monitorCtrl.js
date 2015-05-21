angular.module('app.monitor', [])
  .controller('MonitorCtrl', function ($scope, requestService, $state, $timeout, $ocLazyLoad) {
    $scope.backToMyapp = function () {
      $("#platform-body").removeClass("is-expand");
      $timeout(function () {
        $state.go("myapp")
      }, 300)
    }

  });
