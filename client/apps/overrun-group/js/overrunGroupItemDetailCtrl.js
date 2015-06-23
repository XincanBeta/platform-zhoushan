angular.module('app.overrun-group').controller('OverrunGroupItemDetailCtrl',
  function ($scope, $state, $modal, sliderService, $rootScope, $location, anchorSmoothScroll) {

    /*--------------------------
     $ 目录
     --------------------------*/
    /*
     选项卡
     全屏案卷
     页内导航
     详细信息
     */


    /*--------------------------
     $ 选项卡
     --------------------------*/
    var tabset = [{
      name: '案件',
      content: 'detailContent',
      operator: 'detailOperator'
    }, {
      name: '证件',
      content: 'photoContent',
      operator: 'photoOperator'
    }, {
      name: '案卷',
      content: 'docContent',
      operator: 'docOperator'
    }]


    $scope.tabset = tabset;
    $scope.select = function (tab) {
      $scope.selected = tab;
    }

    $scope.isSelected = function (tab) {
      return (tab === $scope.selected) ? 'active' : '';
    }


    /*--------------------------
     $ 全屏案卷
     --------------------------*/
    var path = '../apps/overrun-group/partials/';
    var fullscreenModalInstance;
    $scope.fullscreenDoc = function () {
      fullscreenModalInstance = $modal.open({
        keyboard: true,
        size: "fullscreen",
        templateUrl: path + 'docFullscreen.html',
        controller: 'OverrunGroupViewerFullscreenCtrl',
        resolve: {
          item: function(){
            return $scope.item;
          }
        }
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


    /*--------------------------
     $ 页内导航
     --------------------------*/
    $scope.gotoAnchor = function (id) {
      $location.hash(id);
      anchorSmoothScroll.scrollTo(id);
    }


    /*--------------------------
     $ 详细信息
     --------------------------*/
    $rootScope.$on("entity.update", function (event, res) {
      $scope.item = res.data;
      // 设置单位
      $scope.unit = _getUnit($scope.item.cj_cxlx)
    })


    function _getUnit(cxlx) {
      if (!cxlx || cxlx == "") {
        return ""
      }
      if (cxlx == '超重') {
        return '吨'
      } else {
        return '米'
      }
    }

  })
