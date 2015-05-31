angular.module('app.overrun-leader').controller('OverrunLeaderItemEditCtrl',
  function ($scope, $state, sliderService, $modalInstance, $modal,
            requestService, item, itemIsNew, ngToast, $anchorScroll, $location, anchorSmoothScroll, util, $q) {






    // 正常关闭本层
    $scope.closeModal = function () {
      $modalInstance.close();
    }
    // 错误关闭本层
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    }


  })
