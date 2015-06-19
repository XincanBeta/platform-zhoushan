angular.module('app.overrun').controller('OverrunReportSettingCtrl',
  function ($scope, $rootScope, $state, sliderService, $modalInstance, $modal,
            requestService, myToast) {
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    }

    requestService.overrunAdminDeptQuery().success(function (res) {
      $scope.deptlist = res.data;
    })

    // 选完后再统一处理
    $scope.selectDept = function ($event) {
      $event.stopPropagation();
    }

    /*
     {"apps":[{"appid":"1"},{"appid":"2"}],"wkna":"xxx","wkno":"xx","owngrp":"xxx"}
     */
    $scope.save = function () {
      // 处理 appid
      var newApps = []
      for (var i = 0; i < $scope.deptlist.length; i++) {
        var dept = $scope.deptlist[i];
        if (dept.selected === true) {
          newApps.push({dwid: dept.dwid})
        }
      }
      $scope.item.apps = newApps;

      requestService.overrunAdminUserUpdate($scope.item).success(function () {
        myToast.successTip();
        // 刷新：修改成功后调用刷新
        $rootScope.$emit("paging.act")
        $modalInstance.close();
      }).error(function () {
        myToast.failureTip();
      });
    }


  })
