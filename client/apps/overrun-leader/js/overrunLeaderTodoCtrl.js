angular.module('app.overrun-leader').controller('OverrunLeaderTodoCtrl',
  function ($scope, $state, $rootScope, sliderService, requestService, $modal, $timeout) {
    /*
      分页
    */


    /*--------------------------
      $ 分页
    --------------------------*/
    $scope.pagingAct = function (str, currentPage) {
      $scope.currentPage = currentPage || 1;
      $scope.pageSize = 20; // 每页显示 20 条
      requestService.overrunLeaderTodoItems({
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
    // 分页点击初始化
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
    var path = '../apps/overrun-leader/partials/';




  });
