angular.module('app.overrun').controller('OverrunViewerFullscreenCtrl',
  function ($scope, $modalInstance, pdfurl, item) {


    $scope.closeFullscreenModal = function () {
      $modalInstance.close();
    }

    $scope.getPdfurl = function () {
      // pdfurl = fileUpLoad/xxx/xxx/xxx.pdf
      return location.protocol + '//' + location.host + '/' + pdfurl;
    }

    $scope.getItemId = function () {
      return item.aj_id;
    }


  })

