angular.module('app.overrun-admin').controller('OverrunAdminDictEditCtrl',
  function ($scope, $rootScope, $state, sliderService, $modalInstance, $modal, requestService, item, myToast) {

    $scope.cancel = function () {
      $modalInstance.dismiss('取消');
    }

    // 初始化
    $scope.item = item;
    $scope.dictvalue_1 = '';
    $scope.dictvalue_2 = '';

    $scope.dictlist = [
      {
        dictname: '执法人',
        dictcode: 'ZFR'
      },
      {
        dictname: '案发地点',
        dictcode: 'AFDD'
      },
      {
        dictname: '现场笔录地点',
        dictcode: 'XCBLDD'
      },
      {
        dictname: '询问笔录地点',
        dictcode: 'XWBLDD'
      },
      {
        dictname: '停车地点',
        dictcode: 'TCDD'
      },
      {
        dictname: '车辆类型',
        dictcode: 'CLLX'
      }
    ];

    $scope.setDict = function (dict) {
      $scope.selectedDict = dict;
      $scope.dictname = dict.dictname; // 显示
      $scope.item.dictname = dict.dictname;
      $scope.item.dictcode = dict.dictcode;
      $scope.item.dictvalue = '';
    };

    $scope.setDict($scope.dictlist[0]);

    $scope.save = function () {
      if ($scope.item.dictname == '执法人') {
        $scope.item.dictvalue = $scope.dictvalue_1 + ',' + $scope.dictvalue_2;
      }
      // 完备其他信息
      $scope.item.appname = 'CXCF';
      requestService.overrunDictInsert($scope.item).success(function () {
        myToast.successTip();
        // 刷新：修改成功后调用刷新
        $rootScope.$emit("paging.act")
        $modalInstance.close();
      }).error(function () {
        myToast.failureTip();
      });
    }


  })
