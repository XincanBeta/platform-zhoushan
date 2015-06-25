angular.module('app.overrun-admin').controller('OverrunAdminUserEditCtrl',
  function ($scope, $rootScope, $state, sliderService, $modalInstance, $modal, requestService, item, itemIsNew, myToast) {
    $scope.itemIsNew = itemIsNew;

    /*
     目录：

     验证账户
     应用
     单位
     保存
     */

    /*--------------------------
     $ 验证账户是否存在
     --------------------------*/
    $scope.wknoIsValid = true // 初始化
    $scope.validateWkno = function(){
      //console.log('>>',item.wkno);
      //$scope.wknoIsValid = false
    }



    /*--------------------------
     $ 初始化应用信息
     --------------------------*/
    // 临时数据
    $scope.appList = [
      {
        appid: '0101',
        name: '现场超限处罚应用',
        subname: "业务员版"
      },
      {
        appid: '0102',
        name: '现场超限处罚应用',
        subname: "集体讨论版"
      },
      {
        appid: '0103',
        name: '现场超限处罚应用',
        subname: "管理员版"
      }
    ]

    requestService.overrunAdminDeptQuery().success(function (res) {
      if (res.success) {
        $scope.deptlist = res.data;
        //console.log($scope.deptlist);
      }
    })

    $scope.item = item;
    if (!itemIsNew) {
      $scope.dwmc = item.dw.dwmc;
    }


    // 通过 item.apps 更新 $scope.appList
    for (var i = 0; i < $scope.appList.length; i++) {
      _.each(item.apps, function (userApp) {
        if (userApp.appid == $scope.appList[i].appid) {
          $scope.appList[i].selected = true;
        }
      })
    }


    /*--------------------------
     $ 单位
     --------------------------*/

    // 对应 wk 表
    $scope.setDept = function (dept) {
      $scope.selectedDept = dept;
      $scope.item.owngrp = dept.dwid;
      $scope.dwmc = dept.dwmc; // 显示
    };


    /*--------------------------
     $ 保存
     --------------------------*/
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
