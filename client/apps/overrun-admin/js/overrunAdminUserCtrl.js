angular.module('app.overrun-admin').controller('OverrunAdminUserCtrl',
  function ($scope, $rootScope, requestService, $modal, sliderService) {
    var path = '../apps/overrun-admin/partials/';

    $scope.pagingAct = function (str, currentPage) {
      $scope.currentPage = currentPage || 1;
      $scope.pageSize = 20; // 每页显示 20 条
      requestService.overrunAdminUserQuery({
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

    $scope.select = function (item) {
      $scope.selected = item
    }

    $scope.isSelected = function (item) {
      return $scope.selected == item ? "active" : "";
    }

    sliderService.initRequestMethod(requestService.overrunAdminDeptItemDetail);
    $scope.mySliderToggle = function (item) {
      sliderService.setRequestData({dwid: item.dwid})
      if (!$scope.selected) {
        $scope.selected = item;
        sliderService.show()
      } else if ($scope.selected && $scope.selected === item) {
        $scope.selected = "";
        sliderService.hide()
      } else {
        $scope.selected = item;
        sliderService.showAfterHide()
      }
    }

    $rootScope.$on("row.clearSelected", function () {
      $scope.selected = "";
      $scope.$apply();
    })

    $scope.add = function () {
      var modalInstance
      var item = {};
      //requestService.getNewId().success(function (res) {
        /*if (!res.success) {
          throw 'new id get failure !'
        }
        item.wkno = res.data;*/
        modalInstance = $modal.open({
          backdrop: "static",
          keyboard: false,
          size: "md",
          templateUrl: path + 'user-edit.html',
          controller: 'OverrunAdminUserEditCtrl',
          resolve: {
            item: function () {return item;},
            itemIsNew: function(){return true}
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
      //})
    }



  }
)
