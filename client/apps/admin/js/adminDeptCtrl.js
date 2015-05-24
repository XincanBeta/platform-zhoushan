angular.module('app.admin').controller('AdminDeptCtrl',
  function ($scope, requestService, $modal, sliderService) {
    var path = '../apps/admin/partials/';

    $scope.add = function () {
      var modalInstance
      var item = {};
      requestService.getNewId().success(function (res) {
        if (!res.success) {
          throw 'new id get failure !'
        }
        item.dw_bh = res.data;
        modalInstance = $modal.open({
          backdrop: "static",
          keyboard: false,
          size: "lg",
          templateUrl: path + 'dept-edit.html',
          controller: 'OverrunEditCtrl',
          resolve: {
            item: function () {return item;},
            itemIsNew: function(){return true}
          }
        })

        modalInstance.opened.then(function () {
          sliderService.stopAutoHide();
        })

        modalInstance.result.then(function () {
          sliderService.startAutoHide();
          //$scope.pagingAct();
        }, function () {
          sliderService.startAutoHide();
        });
      })
    }

  }
)
