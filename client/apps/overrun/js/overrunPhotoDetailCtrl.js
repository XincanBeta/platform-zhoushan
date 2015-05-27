angular.module('app.overrun').controller('OverrunPhotoDetailCtrl',
  function ($scope, imageInfo) {
    $scope.cancel = function () {
      $modalInstance.dismiss('取消');
    }


    console.log(imageInfo);



  })
