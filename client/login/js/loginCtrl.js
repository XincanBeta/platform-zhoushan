angular.module('app.login', [
  'ngAnimate',
  'cfp.hotkeys'
])
  .controller('LoginCtrl', function ($scope, $http) {
    var parentScope = parent.angular.element('#client-index').scope();

    $scope.test = function(){
      $scope.isError = !$scope.isError;
    }


    $scope.wkno = 'ali';
    $scope.passwd = '123';

    $scope.login = function () {
      $http.post('/api/logins/login.do', {wkno: $scope.wkno, passwd: $scope.passwd})
        .success(function (res) {
          if (res.success) {
            parentScope.signIn(res.data);
          }
        })
    }
  })