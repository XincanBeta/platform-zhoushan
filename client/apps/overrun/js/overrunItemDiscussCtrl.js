angular.module('app.overrun').controller('OverrunItemDiscussCtrl',
  function ($scope, $rootScope, $modalInstance, requestService, item, ngToast, myToast) {
    $scope.cancel = function () {
      $modalInstance.dismiss('取消');
    }

    $scope.discuss = function () {
      requestService.getNewId().success(function (res) {
        if (!res.success) {
          throw 'new id get failure !'
        }
        var jt_bh = res.data;
        if (item.jtbh) {
          jt_bh = item.jtbh;
        }
        requestService.overrunItemsDiscussInsert({aj_id: item.aj_id, jt_bh: jt_bh})
          .success(function (res) {
            if (res.success) {
              myToast.successTip('操作成功!');
              // 让“子页面”去刷新
              $modalInstance.close();
              // 发送消息通知
              requestService.getNewId().success(function (res) {
                requestService.notiInsert({
                  notid: res.data,
                  appid: "0102", // appid 给 后端做关联 ，overrun-leader
                  route: "myapp.overrun-leader.todo",
                  content: "车牌为 " + item.cj_cp + " 案件 需要进行集体讨论"
                }).success(function(res){
                  console.log('发送消息通知', res);
                  $rootScope.$emit("noti.refresh")
                })
              })
            }
          }).error(function () {
            myToast.failureTip('操作失败!');
          })
      })
    }
  })
