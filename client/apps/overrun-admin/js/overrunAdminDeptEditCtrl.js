angular.module('app.overrun-admin').controller('OverrunAdminDeptEditCtrl',
  function ($scope, $state, sliderService, $modalInstance,
            requestService, item, itemIsNew, myToast, $rootScope) {

    // 挂在 $scope
    $scope.item = item;

    // 更新案号年份
    $scope.ahnf = new Date().getFullYear();

    $scope.save = function () {
      var savePromise;
      if (itemIsNew) {
        savePromise = requestService.overrunAdminDeptItemSave($scope.item)
      } else {
        savePromise = requestService.overrunAdminDeptItemUpdate($scope.item)
      }
      savePromise.success(function (res) {
        if (res.success) {
          myToast.successTip();
          // 刷新：修改成功后调用刷新
          $rootScope.$emit("paging.act")
          $modalInstance.close();
        }
      }).error(function () {
        myToast.failureTip();
      })
    }


    $scope.closeModal = function () {
      $modalInstance.close();
    }
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    }


  })
