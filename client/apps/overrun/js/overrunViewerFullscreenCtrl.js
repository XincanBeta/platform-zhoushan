angular.module('app.overrun').controller('OverrunViewerFullscreenCtrl',
  function ($scope) {
    

    $scope.closeFullscreenModal = function () {
      $scope.closeModal();
      //$scope.$parent.test()

    }

    $scope.test();


  })
