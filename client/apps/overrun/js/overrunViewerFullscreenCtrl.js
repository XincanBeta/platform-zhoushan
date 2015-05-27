angular.module('app.overrun').controller('OverrunViewerFullscreenCtrl',
  function ($scope, $modalInstance) {


    $scope.closeFullscreenModal = function () {
      $modalInstance.close();
    }


  })
