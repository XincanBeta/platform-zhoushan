angular.module('app.overrun').controller('OverrunForfeitCtrl',
  function ($scope, $http, $state, $rootScope, sliderService, requestService) {

    $scope.select = function (item) {
      $scope.selected = item
    }

    $scope.isSelected = function (item) {
      return $scope.selected == item ? "active" : "";
    }



  });
