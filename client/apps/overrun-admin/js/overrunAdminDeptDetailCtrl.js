angular.module('app.overrun-admin').controller('OverrunAdminDeptDetailCtrl',
  function ($scope, $state, $modal, sliderService, $rootScope, requestService ) {

    // 接收详细信息
    $rootScope.$on("entity.update", function (event, res) {
      $scope.item = res.data;

      // 获取下级单位
      requestService.getDeptlistWithPermission({dwid: $scope.item.dwid}).success(function(res){
        if(res.success){
          // 过滤本单位
          var deptList = _.filter(res.data, function(dept){
            return $scope.item.dwid == dept.dwid ? false : true ;
          })
          $scope.deptList = deptList;
        }
      })
    })

    // 更新案号年份
    $scope.ahnf = new Date().getFullYear();

    // 案件修改
    var path = '../apps/overrun-admin/partials/';
    $scope.edit = function () {
      var modalInstance = $modal.open({
        backdrop: "static",
        keyboard: false,
        size: "lg",
        templateUrl: path + 'dept-edit.html',
        controller: 'OverrunAdminDeptEditCtrl',
        resolve: {
          item: function () {
            return $scope.item // 指令内部控制器，不能访问到外部 scope
          },
          itemIsNew: function(){return false;}
        }
      })

      modalInstance.result.then(function () {
        sliderService.startAutoHide();
      }, function () {
        sliderService.startAutoHide();
      });

      modalInstance.opened.then(function () {
        sliderService.stopAutoHide();
      })
    }


    $scope.isSelected = function (tab) {
      return (tab === $scope.selected) ? 'active' : '';
    }






  })
