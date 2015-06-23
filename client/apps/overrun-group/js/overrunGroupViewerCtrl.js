angular.module('app.overrun-group').controller('OverrunGroupViewerCtrl',
  function ($scope) {

    console.log($scope.item);
    
    $scope.getPdfurl = function () {
      //"fileUpLoad\\201506\\20150680808_浙舟公路罚(2015)000001.docx"
      return $scope.item.currentpath_pdf;
      //return location.protocol + '//' + location.host + '/' + $scope.item.currentpath_pdf;
    }




  })

