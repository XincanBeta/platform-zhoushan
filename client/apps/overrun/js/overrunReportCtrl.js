angular.module('app.overrun').controller('OverrunReportCtrl',
  function ($scope, requestService, $modal, sliderService, $rootScope) {

    var date = moment().add(-1, 'months')
    $scope.tjsj_search = date.format('YYYY-MM')
    $scope.tjsj_title = date.format('YYYY年MM月')

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
