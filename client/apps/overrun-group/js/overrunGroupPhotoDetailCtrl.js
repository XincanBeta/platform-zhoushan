angular.module('app.overrun-group').controller('OverrunGroupPhotoDetailCtrl',
  function ($scope, $modalInstance, imageInfo, requestService) {

    requestService.queryContentImages({
      //dataid: imageInfo.dataid,
      //datatype: imageInfo.datatype,
      fileid: imageInfo.fileid
    }).success(function (res) {
      console.log(res);
      $scope.image = res.data;
      //console.log($scope.images);
      //$scope.carouselIndex = imageInfo.imageIndex;
    })



  })
