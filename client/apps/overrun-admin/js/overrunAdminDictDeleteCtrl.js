angular.module('app.overrun-admin').controller('OverrunAdminDictDeleteCtrl',
  function ($scope, $modalInstance, requestService, selectedItems, itemList, ngToast) {
    $scope.cancel = function () {
      $modalInstance.dismiss('取消');
    }
    $scope.delete = function () {
      requestService.overrunDictDelete(selectedItems)
        .success(function (res) {
          if (res.success) {
            for (var i = 0; i < itemList.length; i++) {
              var item = itemList[i];
              var find = _.find(selectedItems, function (_item) {
                // todo：思考如何复用
                return _item.dictid == item.dictid;
              });
              if (find) {
                // todo: itemlist 不能直接删除，否则会影响遍历
                itemList[i] = undefined;
              }
            }
            itemList = _.filter(itemList, function(item){
              return item !== undefined;
            })
            ngToast.create({
              className: 'success',
              content: '删除成功!'
            })
            // 把结果带回
            $modalInstance.close(itemList);
          }
        })
    }
  })
