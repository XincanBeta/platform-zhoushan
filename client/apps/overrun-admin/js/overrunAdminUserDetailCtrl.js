angular.module('app.overrun-admin').controller('OverrunAdminUserDetailCtrl',
  function ($scope, $state, $modal, sliderService, $rootScope ) {

    $scope.select = function (tab) {
      $scope.selected = tab;
    }

    // 案件修改
    var path = '../apps/overrun-admin/partials/';
    $scope.editInfo = function () {
      var modalInstance = $modal.open({
        backdrop: "static",
        keyboard: false,
        size: "lg",
        templateUrl: path + 'dept-edit.html',
        controller: 'OverrunAdminDeptEditCtrl',
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




    $scope.isSelected = function (tab) {
      return (tab === $scope.selected) ? 'active' : '';
    }


    // 接收详细信息
    $rootScope.$on("entity.update", function (event, res) {
      $scope.item = res.data;
    })

  })
