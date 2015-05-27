angular.module('app.admin').controller('AdminDeptCtrl',
  function ($scope, requestService, $modal, sliderService) {
    var path = '../apps/admin/partials/';

    $scope.pagingAct = function (str, currentPage) {
      $scope.currentPage = currentPage || 1;
      $scope.pageSize = 20; // 每页显示 20 条
      requestService.adminDeptItems({
        currentPage: $scope.currentPage,
        pageSize: $scope.pageSize
      }).success(function (res) {
        if (res.success) {
          $scope.itemList = res.data.list;
          $scope.total = res.data.total;
        }
      })
    }
    // 1）分页点击初始化
    $scope.pagingAct();


    $scope.add = function () {
      var modalInstance
      var item = {};
      requestService.getNewId().success(function (res) {
        if (!res.success) {
          throw 'new id get failure !'
        }
        item.dw_bh = res.data;
        modalInstance = $modal.open({
          backdrop: "static",
          keyboard: false,
          size: "lg",
          templateUrl: path + 'dept-edit.html',
          controller: 'AdminDeptEditCtrl',
          resolve: {
            item: function () {
              return item;
            },
            itemIsNew: function () {
              return true
            }
          }
        })

        modalInstance.opened.then(function () {
          sliderService.stopAutoHide();
        })

        modalInstance.result.then(function () {
          sliderService.startAutoHide();
          // 2）save 成功 modal 正常关闭时刷新
          $scope.pagingAct();
        }, function () {
          sliderService.startAutoHide();
        });
      })
    }





  })
