angular.module('app.myapp', []).controller('MyappCtrl', function ($scope, requestService, $state, $timeout) {

  requestService.myappBusiItems().success(function (apps) {
    $scope.busiApps = apps;
  })


  requestService.myappSaItems().success(function (apps) {
    $scope.saApps = apps;
  })


  $scope.go = function (app) {
    if (app.disabled) {
      return;
    }
    var state = app.routestate;
    if (state == 'myapp' || state == '') {
      return console.log('请正确配置 router state');
    }
    $("#platform-body").addClass("is-expand");
    $timeout(function(){
      $state.go(state)
    }, 300)

  }
});
