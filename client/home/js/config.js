angular.module('app', [
  'ui.router',
  'ngAnimate',
  'oc.lazyLoad',
  'request',
  'ngToast',
  'angular-loading-bar'
])
  .config(function (ngToastProvider) {
    // ngToast 星号标示的属性必须在 config 配置生效
    // className 参考 bootstrap alerts
    ngToastProvider.configure({
      dismissButton: true,
      timeout: 2000,
      dismissOnTimeout: true,
      dismissOnClick: true,
      horizontalPosition: 'center',
      animation: 'fade'
    });
  })
  .run(function ($rootScope, $http) {
    /*
     设置分页的固定参数
     */


  })



