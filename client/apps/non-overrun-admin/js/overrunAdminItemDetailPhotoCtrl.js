angular.module('app.overrun-admin').controller('OverrunAdminItemDetailPhotoCtrl',
  function ($scope, sliderService, requestService, $modal) {
    // 参照 overrun


    /*--------------------------
     $ 目录

     侧边栏：
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
    $scope.recheckImages = [];

    // 证件初始化
    _loadImage($scope.item.aj_id, 'sceneImages');
    _loadImage($scope.item.aj_id, 'vehicleImages');
    _loadImage($scope.item.aj_id, 'driverImages');
    _loadImage($scope.item.aj_id, 'billImages');
    _loadImage($scope.item.aj_id, 'recheckImages');

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
    var path = '../apps/overrun-admin/partials/';
    $scope.openPhotoModal = function (imageType, index, image) {
      var modalInstance = $modal.open({
        backdrop: true,
        keyboard: true,
        size: "lg",
        templateUrl: path + 'photo-detail.html',
        controller: 'OverrunAdminPhotoDetailCtrl',
        resolve: {
          imageInfo: function () {
            return {
              //dataid: $scope.item.aj_id,
              //datatype: imageType,
              //imageIndex: index,
              fileid: image.fileid
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
