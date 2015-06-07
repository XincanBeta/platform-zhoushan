angular.module('app.overrun').controller('OverrunDoneCtrl',
  function ($scope, $http, $state, $rootScope, sliderService, requestService) {
    /*
     分页
     侧边栏
     checkbox 处理
     导出（下载）
     */
    $scope.pagingAct = function (str, currentPage) {
      $scope.currentPage = currentPage || 1;
      $scope.pageSize = 20; // 每页显示 20 条
      requestService.overrunDoneItems({
        currentPage: $scope.currentPage,
        pageSize: $scope.pageSize,
        aj_jazt: '是'
      }).success(function (res) {
        if (res.success) {
          $scope.itemList = res.data.list;
          $scope.total = res.data.total;
        }
      })
    }
    // 分页点击初始化
    $scope.pagingAct();


    $scope.select = function (item) {
      $scope.selected = item
    }

    $scope.isSelected = function (item) {
      return $scope.selected == item ? "active" : "";
    }

    sliderService.initRequestMethod(requestService.overrunDoneItemDetail);
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


    /*--------------------------
     $ checkbox 处理
     --------------------------*/
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

    $scope.selectIsActived = function () {
      var found = $scope._($scope.itemList).find(function (item) {
        return item.selected === true
      });
      return found;
    }

    /*--------------------------
     $ 导出（下载）
     --------------------------*/
    $scope.export = function (type) {
      var selectedItems = $scope._($scope.itemList).filter(function (item) {
        return item.selected === true
      })
      // then 与 success 返回的不同，then 返回了更多的信息
      requestService.overrunDoneItemExport({type: type, itemlist: selectedItems}).then(function (response) {
        var contentType = response.headers('Content-Type');
        var url = location.protocol + '//' + location.host + '/' + response.data.data;
        $http({
          method: 'GET',
          url: url,
          headers: {
            'Content-Type': contentType
          }
        })
      })
    }


  });
