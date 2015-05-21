angular.module('app.overrun').controller('OverrunEntityPhotoCtrl',
  function ($scope, Lightbox, sliderService, Upload, $http) {

    /*--------------------------
     $ 目录
     证件获取
     证件上传
     证件全屏
     --------------------------*/

    /*--------------------------
     $ 证件获取
     --------------------------*/
    $scope.vehicleImages = [];
    $scope.driverImages = [];
    $scope.billImages = [];

    $scope.vehicleImagePromise = $http.post('/api/files/query.do', {
      dataid: $scope.item.xccfid,
      datatype: 'vehicle'
    }).success(function (res) {
      var images = res.data;
      for (var i = 0; i < images.length; i++) {
        $scope.vehicleImages.push(images[i])
      }
    })



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
