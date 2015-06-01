angular.module('app.overrun').controller('OverrunTodoCtrl',
  function ($scope, $state, $rootScope, sliderService, requestService, $modal, $timeout) {
    $scope.pagingAct = function (str, currentPage) {
      $scope.currentPage = currentPage || 1;
      $scope.pageSize = 20; // 每页显示 20 条
      requestService.overrunTodoItems({
        currentPage: $scope.currentPage,
        pageSize: $scope.pageSize,
        aj_jazt: null
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

    /* 
     1）传入在 requestService 中的方法定义，好处是切换 env 环境能灵活适应
     2）至于 post 还是 get，是在 该方法内部调整的，方法背部实现了两套，任意切换
     3）参数传入，统一以对象的形式
     4）sliderService 不管传入的具体方法
     */
    sliderService.initRequestMethod(requestService.overrunTodoItemDetail);
    $scope.mySliderToggle = function (item) {
      sliderService.setRequestData({aj_id: item.aj_id})
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


    // 新增(包含info 和 证件信息)
    var path = '../apps/overrun/partials/';
    $scope.add = function () {
      var modalInstance
      var item = {};
      requestService.getNewId().success(function (res) {
        if (!res.success) {
          throw 'new id get failure !'
        }
        item.aj_id = res.data;
        modalInstance = $modal.open({
          backdrop: "static",
          keyboard: false,
          size: "lg",
          templateUrl: path + 'item-edit.html',
          controller: 'OverrunItemEditCtrl',
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
          // 刷新
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
      // 通过 ng-checked="item.selected" 来控制列表项的 checkbox 状态
      // ng-checked 只能反映 checkbox 的状态
      // ng-model 能改变状态
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
        templateUrl: path + 'item-delete.html',
        controller: 'OverrunItemDeleteCtrl',
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
        // 2）保存后刷新
        $scope.pagingAct();
        sliderService.startAutoHide();
      }, function () {
        sliderService.startAutoHide();
      });


    }

    /*






     */


  });
