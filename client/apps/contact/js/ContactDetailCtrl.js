angular.module('app.contact').controller('ContactDetailCtrl',
  function ($scope, $state, $modal, sliderService, $rootScope) {

    /*--------------------------
     $ 目录
     --------------------------*/
    /*
     修改
     */



    /*--------------------------
     $ 修改
     --------------------------*/
    var path = '../apps/overrun/partials/';
    $scope.edit = function () {
      var modalInstance = $modal.open({
        backdrop: "static",
        keyboard: false,
        size: "lg",
        templateUrl: path + 'item-edit.html',
        controller: 'OverrunItemEditCtrl',
        resolve: {
          item: function () {
            return $scope.item // 指令内部控制器，不能访问到外部 scope
          },
          itemIsNew: function () {
            return false
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



  })
