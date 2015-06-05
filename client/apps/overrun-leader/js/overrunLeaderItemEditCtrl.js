angular.module('app.overrun-leader').controller('OverrunLeaderItemEditCtrl',
  function ($scope, $state, sliderService, $modalInstance, $modal,
            requestService, item, ngToast, $anchorScroll, $location, anchorSmoothScroll, util, $q) {

    // fixme：临时初始化
    $scope.item = {}
    var dateFormat = 'YYYY-MM-DD HH:mm';
    $scope.openDatepicker = {
      tlsj: false
    };
    $scope.dateOptions = {
      showWeeks: false, // 标准
      startingDay: 1 // 周一开始
    };
    $scope.timeOptions = {
      //readonlyInput: true,
      showMeridian: false // meridian false 为 24小时制
    };
    $scope.openCalendar = function (e, dateField) {
      e.preventDefault();
      e.stopPropagation();
      $scope.openDatepicker[dateField] = true;
    };

    // 时间初始化
    if (!$scope.item.tlsj) {
      var date = moment().format(dateFormat);
      $scope.item.tlsj = date
    }

    // 正常关闭本层
    $scope.closeModal = function () {
      $modalInstance.close();
    }
    // 错误关闭本层
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    }


  })
