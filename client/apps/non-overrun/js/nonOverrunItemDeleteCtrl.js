angular.module('app.non-overrun').controller('NonOverrunItemDeleteCtrl',
  function ($scope, $modalInstance, requestService, selectedItems, itemList, ngToast) {

    $scope.cancel = function () {
      $modalInstance.dismiss('取消');
    }

    $scope.delete = function () {
      requestService.overrunItemsDelete(selectedItems)
        .success(function (res) {
          if (res.success) {
            for (var i = 0; i < itemList.length; i++) {
              var item = itemList[i];
              var find = _.find(selectedItems, function (_item) {
                return _item.aj_id == item.aj_id;
              });
              if (find) {
                itemList.splice(i, 1);
              }
            }
            ngToast.create({
              className: 'success',
              content: '删除成功!'
            })
            $modalInstance.close();
          }
        })
    }

  })
