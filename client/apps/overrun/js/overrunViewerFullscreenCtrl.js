angular.module('app.overrun').controller('OverrunViewerFullscreenCtrl',
  function ($scope, $modalInstance, pdfurl) {


    $scope.closeFullscreenModal = function () {
      $modalInstance.close();
    }

    $scope.getPdfurl = function(){
      return pdfurl;
    }


  })
