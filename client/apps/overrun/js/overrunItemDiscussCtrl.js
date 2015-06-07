angular.module('app.overrun').controller('OverrunItemDiscussCtrl',
  function ($scope, $modalInstance, requestService, item, ngToast) {

    console.log('item=', item);

    $scope.cancel = function () {
      $modalInstance.dismiss('取消');
    }

    $scope.discuss = function () {
      requestService.overrunItemsDiscuss(item)
        .success(function (res) {
          if (res.success) {
            ngToast.create({
              className: 'success',
              content: '操作成功!'
            })
            $modalInstance.close();
          }
        })
    }

  })
