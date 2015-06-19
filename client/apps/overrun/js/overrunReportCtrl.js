angular.module('app.overrun').controller('OverrunReportCtrl',
  function ($scope, requestService, $modal, sliderService, $rootScope) {

    $scope.tjsj = '2015-04-10'

    var path = '../apps/overrun/partials/';
    /*--------------------------
     $ 设置
     --------------------------*/
    $scope.setting = function () {
      var modalInstance
      modalInstance = $modal.open({
        backdrop: "static",
        keyboard: false,
        size: "md",
        templateUrl: path + 'report-setting.html',
        controller: 'OverrunReportSettingCtrl'
      })

      modalInstance.opened.then(function () {
        sliderService.stopAutoHide();
      })

      modalInstance.result.then(function () {
        sliderService.startAutoHide();
      }, function () {
        sliderService.startAutoHide();
      });
    }


  });
