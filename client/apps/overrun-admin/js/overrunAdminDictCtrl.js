angular.module('app.overrun-admin').controller('OverrunAdminDictCtrl',
  function ($scope, requestService, $modal, sliderService, $rootScope) {
    var path = '../apps/overrun-admin/partials/';

    $scope.pagingAct = function (str, currentPage) {
      $scope.currentPage = currentPage || 1;
      $scope.pageSize = 20; // 每页显示 20 条
      requestService.overrunDictQueryPage({
        currentPage: $scope.currentPage,
        pageSize: $scope.pageSize
      }).success(function (res) {
        if (res.success) {
          $scope.itemList = res.data.list;
          $scope.total = res.data.total;
        }
      })
    }
    // 刷新 1：页面初始化
    $scope.pagingAct();
    // 刷新 2：用于保存成功后的调用
    $rootScope.$on("paging.act", $scope.pagingAct)

    $scope.select = function (item) {
      $scope.selected = item
    }

    $scope.isSelected = function (item) {
      return $scope.selected == item ? "active" : "";
    }

    $scope.add = function () {
      var modalInstance, item = {};
      requestService.getNewId().success(function (res) {
        if (!res.success) {
          throw 'new id get failure !'
        }
        item.dictid = res.data;
        modalInstance = $modal.open({
          backdrop: "static",
          keyboard: false,
          size: "md",
          templateUrl: path + 'dict-edit.html',
          controller: 'OverrunAdminDictEditCtrl',
          resolve: {
            item: function () {return item;}
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
      })
    }// add

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
        templateUrl: path + 'dict-delete.html',
        controller: 'OverrunAdminDictDeleteCtrl',
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
