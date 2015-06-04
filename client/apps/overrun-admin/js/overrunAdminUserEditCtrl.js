angular.module('app.overrun-admin').controller('OverrunAdminUserEditCtrl',
  function ($scope, $rootScope, $state, sliderService, $modalInstance, $modal, requestService, item, itemIsNew, myToast) {
    /*--------------------------
     $ 临时数据
     --------------------------*/
    $scope.appList = [
      {
        appid: '0101',
        name: '现场超限处罚应用',
        subname: "业务员版"
      },
      {
        appid: '0102',
        name: '现场超限处罚应用',
        subname: "领导版"
      },
      {
        appid: '0103',
        name: '现场超限处罚应用',
        subname: "管理员版"
      }
    ]

    $scope.deptlist = [
      {
        dwid: '1',
        dwmc: '舟山市公路管理局'
      }, {
        dwid: '2',
        dwmc: '舟山跨海大桥超限运输检测站'
      }, {
        dwid: '3',
        dwmc: '朱家尖检测站'
      }, {
        dwid: '4',
        dwmc: '定海区公路管理局'
      }, {
        dwid: '5',
        dwmc: '普陀区公路管理局'
      }, {
        dwid: '6',
        dwmc: '岱山县公路管理局'
      }, {
        dwid: '7',
        dwmc: '嵊泗县公路管理局'
      }
    ]

    /*--------------------------
      $ 初始化
    --------------------------*/
    $scope.item = item;
    if (!itemIsNew) {
      $scope.dwmc = item.dw.dwmc;
    }


    // 通过 item.apps 更新 $scope.appList
    for(var i=0; i<$scope.appList.length; i++){
      _.each(item.apps, function(userApp){
        if (userApp.appid == $scope.appList[i].appid ) {
          $scope.appList[i].selected = true;
        }
      })
    }


    /*--------------------------
      $ 其他处理
    --------------------------*/

    // 对应 wk 表
    $scope.setDept = function (dept) {
      $scope.selectedDept = dept;
      $scope.item.owngrp = dept.dwid;
      $scope.dwmc = dept.dwmc; // 显示
    };

    // 选完后再统一处理
    $scope.selectApp = function ($event) {
      $event.stopPropagation();
    }

    /*
     {"apps":[{"appid":"1"},{"appid":"2"}],"wkna":"xxx","wkno":"xx","owngrp":"xxx"}
     */
    $scope.save = function () {
      // 处理 appid
      var newApps = []
      for (var i = 0; i < $scope.appList.length; i++) {
        var app = $scope.appList[i];
        if (app.selected === true) {
          newApps.push({appid: app.appid})
        }
      }
      $scope.item.apps = newApps;


      var savePromise;
      if (itemIsNew) {
        savePromise = requestService.overrunAdminUserInsert($scope.item)
      } else {
        savePromise = requestService.overrunAdminUserUpdate($scope.item)
      }

      savePromise.success(function () {
        myToast.successTip();
        // 刷新：修改成功后调用刷新
        $rootScope.$emit("paging.act")
        $modalInstance.close();
      }).error(function () {
        myToast.failureTip();
      });
    }

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    }


  })
