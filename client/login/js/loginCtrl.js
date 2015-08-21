angular.module('app.login', [
  'ngAnimate',
  'cfp.hotkeys'
])
  .controller('LoginCtrl', function ($scope, $http) {
    var parentScope = parent.angular.element('#client-index').scope();

    /*$scope.test = function(){
      $scope.isError = !$scope.isError;
    }*/


    $scope.wkno = '';
    $scope.passwd = '';

    $scope.login = function () {
      if(!$scope.wkno || !$scope.passwd){
        alert('请填写用户名或密码')
        return
      }
      $http.post('/api/logins/login.do', {wkno: $scope.wkno, passwd: $scope.passwd})
        .success(function (res) {
          //console.log(res);
          if (res.success) {
            parentScope.signIn(res.data);
          }else{
            alert(res.msg)
          }
        })
    }
  })













