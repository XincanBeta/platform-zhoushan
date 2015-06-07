angular.module('app.overrun').controller('OverrunViewerCtrl',
  function ($scope) {

    console.log($scope.item);
    
    $scope.getPdfurl = function () {
      // pdfurl = fileUpLoad/xxx/xxx/xxx.pdf
      return location.protocol + '//' + location.host + '/' + $scope.item.currentpath_pdf;
    }




  })

