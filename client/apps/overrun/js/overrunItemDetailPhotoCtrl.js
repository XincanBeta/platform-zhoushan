angular.module('app.overrun').controller('OverrunItemDetailPhotoCtrl',
  function ($scope, Lightbox, sliderService, Upload, $http) {

    /*--------------------------
     $ 目录
     证件获取
     证件全屏
     --------------------------*/

    /*--------------------------
     $ 证件获取
     --------------------------*/
    $scope.sceneImages = [];
    $scope.vehicleImages = [];
    $scope.driverImages = [];
    $scope.billImages = [];

    _loadImage($scope.item.aj_id, 'scene', $scope.sceneImages);
    _loadImage($scope.item.aj_id, 'vehicle', $scope.vehicleImages);
    _loadImage($scope.item.aj_id, 'driver', $scope.driverImages);
    _loadImage($scope.item.aj_id, 'bill', $scope.billImages);

    // date 是业务信息，file 是文件本身
    function _loadImage(dataid, datatype, images) {
      requestService.queryImages({
        dataid: dataid,
        datatype: datatype

      }).success(function (res) {
        images = res.data;
      })
    }


    /*--------------------------
     $ 证件全屏
     --------------------------*/
    // 由于 img 会被 ::after 挡住，所以点击事件在 div 上
    $scope.openLightboxModal = function (images, index) {
      var modalInstance = Lightbox.openModal(images, index)
      modalInstance.result.then(function () {
        sliderService.startAutoHide();
      }, function () {
        sliderService.startAutoHide();
      })
      modalInstance.opened.then(function () {
        sliderService.stopAutoHide();
      })
    }


  })
