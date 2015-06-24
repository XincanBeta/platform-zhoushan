angular.module('app.overrun').controller('OverrunReportSettingCtrl',
  function ($scope, $rootScope, $state, sliderService, $modalInstance, $modal,
            requestService, userService, myToast) {

    /*
     目录
     初始化
     1）获取单位 2）获取报送配置
     监听 截止日期
     */


    /*--------------------------
     $ 初始化
    --------------------------*/
    // 设置固定的单月的日期
    var datePrefix = '2015-03-';
    $scope.ybbjzsj='';
    $scope.cgbjzsj='';
    $scope.item = {ybbjzsj:'', cgbjzsj:''};

    /*--------------------------
     $ 1）获取单位 2）获取报送配置
     --------------------------*/
    requestService.getDeptlistWithPermission().success(function (res) {
      if (res.success) {
        $scope.deptList = res.data;
        requestService.overrunReportSettingQuery().success(function (res) {
          if (res.success) {
            $scope.item = res.data;
            $scope.ybbjzsj = datePrefix + $scope.item.ybbjzsj
            $scope.cgbjzsj = datePrefix + $scope.item.cgbjzsj
            // 更新 下级单位
            var export_dwid = $scope.item.export_dwid.split(',')
            _.each(export_dwid, function (dwid) {
              _.find($scope.deptList, function (dept) {
                if (dept.dwid == dwid) {
                  dept.selected = true;
                  return true;
                }
              })
            })
          }
        })
      }
    })

    /*--------------------------
     $ 监听 截止日期
    --------------------------*/
    $scope.$watch('ybbjzsj', function(value){
      if( value ){
        value = value.substring(value.length-2, value.length);
        $scope.item.ybbjzsj = value
      }
    })

    $scope.$watch('cgbjzsj', function(value){
      if( value ){
        value = value.substring(value.length-2, value.length);
        $scope.item.cgbjzsj = value
      }
    })

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    }

    $scope.selectDept = function ($event, dept) {
      // 至少保留一项
      var checkedDeptList = _.filter($scope.deptList, function (dept) {
        return dept.selected == true;
      });
      if (checkedDeptList.length == 0) {
        dept.selected = true;
      }
      $event.stopPropagation();
    }

    $scope.save = function () {
      // 处理 $scope.deptList，把 selected=true 的取出其 dwid
      var export_dwid = _.map($scope.deptList, function(dept){
        return dept.selected? dept.dwid : ''
      })
      export_dwid = _.filter(export_dwid, function(dwid){
        return dwid != ''
      })
      $scope.item.export_dwid = export_dwid.join(',');

      requestService.overrunReportSettingUpdate($scope.item).success(function () {
        myToast.successTip();
        // 刷新：修改成功后调用刷新
        $rootScope.$emit("paging.act")
        $modalInstance.close();
      }).error(function () {
        myToast.failureTip();
      });
    }


  })
