angular.module('app.overrun').controller('OverrunPhotoDetailCtrl',
  function ($scope, $modalInstance, imageInfo, requestService) {
    $scope.cancel = function () {
      $modalInstance.dismiss('取消');
    }

    requestService.queryContentImages({
      dataid: imageInfo.dataid,
      datatype: imageInfo.datatype
    }).success(function (res) {
      console.log(res.data);
      $scope.images = res.data;
      $scope.carouselIndex = imageInfo.imageIndex;
    })



  })
