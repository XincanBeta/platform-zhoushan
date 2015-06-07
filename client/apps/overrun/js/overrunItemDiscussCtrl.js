angular.module('app.overrun').controller('OverrunItemDiscussCtrl',
  function ($scope, $modalInstance, requestService, item, ngToast) {


    $scope.cancel = function () {
      $modalInstance.dismiss('取消');
    }

    $scope.discuss = function () {
      requestService.getNewId().success(function (res) {
        if (!res.success) {
          throw 'new id get failure !'
        }
        var jt_bh = res.data;
        requestService.overrunItemsDiscussInsert({aj_id: item.aj_id, jt_bh: jt_bh})
          .success(function (res) {
            if (res.success) {
              ngToast.create({
                className: 'success',
                content: '操作成功!'
              })
              $modalInstance.close();
            }
          })
      })
    }
  })
