angular.module('app.overrun').controller('OverrunItemDetailPhotoCtrl',
  function ($scope, Lightbox, sliderService, requestService, $modal) {

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

    // 证件初始化
    _loadImage($scope.item.aj_id, 'sceneImages');
    _loadImage($scope.item.aj_id, 'vehicleImages');
    _loadImage($scope.item.aj_id, 'driverImages');
    _loadImage($scope.item.aj_id, 'billImages');

    // date 是业务信息，file 是文件本身
    function _loadImage(dataid, datatype) {
      requestService.queryImages({
        dataid: dataid,
        datatype: datatype
      }).success(function (res) {
        $scope[datatype] = res.data;
      })
    }


    /*--------------------------
     $ 证件全屏
     --------------------------*/
    // 由于 img 会被 ::after 挡住，所以点击事件在 div 上
    var path = '../apps/overrun/partials/';
    $scope.openPhotoModal = function (imageType, index) {
      var modalInstance = $modal.open({
        backdrop: "static",
        keyboard: false,
        size: "lg",
        templateUrl: path + 'photo-detail.html',
        controller: 'OverrunPhotoDetailCtrl',
        resolve: {
          imageInfo: function () {
            return {
              dataid: $scope.item.aj_id,
              datatype: imageType,
              imageIndex: index
            };
          }
        }
      })

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
