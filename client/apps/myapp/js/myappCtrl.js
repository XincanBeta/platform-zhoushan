angular.module('app.myapp', []).controller('MyappCtrl',
  function ($scope, requestService, $state, $timeout, userService) {
    /*--------------------------
     $ 配置用户可见的应用
     --------------------------*/
    $scope.hasBusiApp = false;
    $scope.hasSaApp = false;

    var userApps = userService.getUser().apps;
    //console.log('app', userApps);
    requestService.myappBusiItems().success(function (apps) {
      //$scope.hasBusiApp = true;
      //$scope.busiApps = apps;
      $scope.busiApps = _filterUserApp(apps, userApps);
      $scope.busiApps.length > 0 ? $scope.hasBusiApp = true : '';
    })

    requestService.myappSaItems().success(function (apps) {
      $scope.saApps = _filterUserApp(apps, userApps);
      $scope.saApps.length > 0 ? $scope.hasSaApp = true : '';
    })


    function _filterUserApp(apps, userApps) {
      var filterApps = [];
      for (var i = 0; i < apps.length; i++) {
        for (var k = 0; k < userApps.length; k++) {
          if (apps[i].appid === userApps[k].appid) {
            filterApps.push(apps[i])
          }
        }
      }
      return filterApps;
    }


    /*--------------------------
     $ 路由跳转
     --------------------------*/

    $scope.go = function (app) {
      if (app.disabled) {
        return;
      }
      var state = app.routestate;
      if (state == 'myapp' || state == '') {
        return console.log('请正确配置 router state');
      }
      $("#platform-body").addClass("is-expand");
      $timeout(function () {
        $state.go(state)
      }, 300)

    }
  });
