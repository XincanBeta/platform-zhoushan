angular.module('app.overrun').controller('OverrunDeleteCtrl',
  function ($scope, $modalInstance, requestService, toDeleteItemList, ngToast) {

    $scope.cancel = function () {
      $modalInstance.dismiss('取消');
    }

    $scope.delete = function () {
      requestService.overrunItemsDelete(toDeleteItemList).success(function (res) {
        if (res.success) {
          ngToast.create({
            className: 'success',
            content: '删除成功!'
          })
          $modalInstance.close(); // close 表示正常关闭
        }
      })
    }

  })
