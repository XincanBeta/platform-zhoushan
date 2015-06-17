angular.module('app.overrun-admin').controller('OverrunAdminDictEditCtrl',
  function ($scope, $rootScope, $state, sliderService, $modalInstance, $modal, requestService, item, myToast) {


    // 初始化
    $scope.item = item;
    $scope.dictvalue_1 = '';
    $scope.dictvalue_2 = '';

    $scope.dictlist = [
      {
        dictname: '执法人'
      },
      {
        dictname: '案发地点'
      },
      {
        dictname: '现场笔录地点'
      },
      {
        dictname: '询问笔录地点'
      },
      {
        dictname: '停车地点'
      },
      {
        dictname: '车辆类型'
      }
    ];

    $scope.setDict = function (dict) {
      $scope.selectedDict = dict;
      $scope.dictname = dict.dictname; // 显示
      $scope.item.dictname = dict.dictname;
    };

    $scope.setDict($scope.dictlist[0]);

    $scope.save = function () {
      if($scope.item.dictname == '执法人' ){
        $scope.item.dictvalue = $scope.dictvalue_1 + ',' +$scope.dictvalue_2;
      }

      console.log($scope.item);

      /*requestService.overrunAdminUserInsert($scope.item).success(function () {
        myToast.successTip();
        // 刷新：修改成功后调用刷新
        $rootScope.$emit("paging.act")
        $modalInstance.close();
      }).error(function () {
        myToast.failureTip();
      });*/
    }


  })
