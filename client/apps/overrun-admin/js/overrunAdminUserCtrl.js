angular.module('app.overrun-admin').controller('OverrunAdminUserCtrl',
  function ($scope, requestService, $modal, sliderService) {
    var path = '../apps/overrun-admin/partials/';

    $scope.add = function () {
      var modalInstance
      var item = {};
      //requestService.getNewId().success(function (res) {
        /*if (!res.success) {
          throw 'new id get failure !'
        }
        item.wkno = res.data;*/
        modalInstance = $modal.open({
          backdrop: "static",
          keyboard: false,
          size: "md",
          templateUrl: path + 'user-edit.html',
          controller: 'OverrunAdminUserEditCtrl',
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
      //})
    }

  }
)
