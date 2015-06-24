angular.module('app.contact').controller('ContactEditCtrl',
  function ($scope, $state, sliderService, $modalInstance, $modal, requestService, item, itemIsNew, util, myToast, $rootScope) {

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    }


  })
