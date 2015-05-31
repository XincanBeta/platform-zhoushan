angular.module('app.overrun-admin').controller('OverrunAdminDeptCtrl',
  function ($scope, requestService, $modal, sliderService, $rootScope) {
    var path = '../apps/overrun-admin/partials/';

    $scope.pagingAct = function (str, currentPage) {
      $scope.currentPage = currentPage || 1;
      $scope.pageSize = 20; // 每页显示 20 条
      requestService.overrunAdminDeptItems({
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
      requestService.getNewId().success(function (res) {
        if (!res.success) {
          throw 'new id get failure !'
        }
        item.dwid = res.data;
        modalInstance = $modal.open({
          backdrop: "static",
          keyboard: false,
          size: "lg",
          templateUrl: path + 'dept-edit.html',
          controller: 'OverrunAdminDeptEditCtrl',
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


    /*
     删除功能部分
     */
    $scope.selectAllItem = function () {
      $scope._($scope.itemList).each(function (item) {
        item.selected = $scope.allItemIsChecked;
      });
    }

    $scope.selectItem = function ($event) {
      $event.stopPropagation();
    }

    $scope.deleteIsActived = function () {
      var found = $scope._($scope.itemList).find(function (item) {
        return item.selected === true
      });
      return found;
    }

    $scope.delete = function () {
      var selectedItems = $scope._($scope.itemList).filter(function (item) {
        return item.selected === true
      });
      var modalInstance = $modal.open({
        backdrop: "static",
        keyboard: false,
        size: "sm",
        templateUrl: path + 'dept-delete.html',
        controller: 'OverrunAdminDeptDeleteCtrl',
        resolve: {
          selectedItems: function () {
            return selectedItems
          },
          itemList: function () {
            return $scope.itemList;
          }
        }
      })

      modalInstance.opened.then(function () {
        sliderService.stopAutoHide();
      })

      modalInstance.result.then(function () {
        sliderService.startAutoHide();
      }, function () {
        sliderService.startAutoHide();
      });
    }// delete


  })
