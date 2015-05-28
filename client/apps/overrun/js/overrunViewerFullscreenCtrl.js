angular.module('app.overrun').controller('OverrunViewerFullscreenCtrl',
  function ($scope, $modalInstance, url) {


    $scope.closeFullscreenModal = function () {
      $modalInstance.close();
    }


  })
