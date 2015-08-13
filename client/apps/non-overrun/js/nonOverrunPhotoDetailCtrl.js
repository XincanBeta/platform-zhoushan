angular.module('app.non-overrun').controller('NonOverrunPhotoDetailCtrl',
  function ($scope, $modalInstance, imageInfo, requestService) {

    $scope.loaded = false;
    requestService.queryContentImages({
      fileid: imageInfo.fileid
    }).success(function (res) {
      if(res.success){
        $scope.loaded = true;
        $scope.image = res.data;
      }
    })



  })
