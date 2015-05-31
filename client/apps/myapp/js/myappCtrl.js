angular.module('app.myapp', []).controller('MyappCtrl',
  function ($scope, requestService, $state, $timeout, userService) {
    /*--------------------------
      $ 配置用户可见的应用
    --------------------------*/
    $scope.hasSaApp = false;
    $scope.hasBusiApp = false;

    var userAppid = userService.getUser().appid;
    requestService.myappBusiItems().success(function (apps) {
      $scope.busiApps = _filterUserApp(apps, userAppid);
      $scope.busiApps.length > 0 ? $scope.hasBusiApp = true : '';
    })

    requestService.myappSaItems().success(function (apps) {
      $scope.saApps = _filterUserApp(apps, userAppid);
      $scope.saApps.length > 0 ? $scope.hasSaApp = true : '';
    })


    function _filterUserApp(apps, userAppid){
      var userAppList = [];
      for(var i=0; i<apps.length; i++){
        for (var k = 0; k < userAppid.length; k++) {
          if (apps[i].appid === userAppid[k]){
            userAppList.push(apps[i])
          }
        }
      }
      return userAppList;
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
