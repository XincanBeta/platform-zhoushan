angular.module('app.overrun').controller('OverrunItemDetailCtrl',
  function ($scope, $state, $modal, sliderService, $rootScope, $location, anchorSmoothScroll) {

    var tabset = [{
      name: '案件',
      content: 'detailContent',
      operator: 'detailOperator'
    }, {
      name: '证件',
      content: 'photoContent',
      operator: 'photoOperator'
    }]

    // 区分待处理和已完结
    if ($state.current.name == "myapp.overrun.done") {
      tabset.push({
        name: '案卷',
        content: 'docContent',
        operator: 'docOperator'
      })
      // ng-if='!hideDetailOperator'
      $scope.hideDetailOperator = true;
    }

    $scope.tabset = tabset;
    $scope.select = function (tab) {
      $scope.selected = tab;
    }

    // 案件修改
    var path = '../apps/overrun/partials/';
    $scope.editInfo = function () {
      var modalInstance = $modal.open({
        backdrop: "static",
        keyboard: false,
        size: "lg",
        templateUrl: path + 'item-edit.html',
        controller: 'OverrunEditCtrl',
        resolve: {
          item: function () {
            return $scope.item // 指令内部控制器，不能访问到外部 scope
          }
        }
      })

      modalInstance.result.then(function () {
        sliderService.startAutoHide();
      }, function () {
        sliderService.startAutoHide();
      });

      modalInstance.opened.then(function () {
        sliderService.stopAutoHide();
      })
    }

    // 全屏
    var fullscreenModalInstance;
    $scope.fullscreenDoc = function () {
      fullscreenModalInstance = $modal.open({
        keyboard: true,
        size: "fullscreen",
        templateUrl: 'docContentFullscreen.html'
      })
      fullscreenModalInstance.result.then(function () {
        sliderService.startAutoHide();
      }, function () {
        sliderService.startAutoHide();
      });

      fullscreenModalInstance.opened.then(function () {
        sliderService.stopAutoHide();
      })
    }
    // modalInstance.close 依赖 modalInstance.result 和 modalInstance.opened
    $scope.closeModal = function () {
      fullscreenModalInstance.close()
    }


    $scope.isSelected = function (tab) {
      return (tab === $scope.selected) ? 'active' : '';
    }

    /*--------------------------
      $ 页内导航
    --------------------------*/
    $scope.gotoAnchor = function (id) {
      $location.hash(id);
      anchorSmoothScroll.scrollTo(id);
    }

    // 接收详细信息
    $rootScope.$on("entity.update", function (event, res) {
      $scope.item = res.data;
    })

  })
