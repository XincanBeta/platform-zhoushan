angular.module('app')
  .config(function ($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    var app_base = "../apps/", bower_base = "../assets/lib/"
    $urlRouterProvider.otherwise("/");
    $stateProvider
      /*--------------------------
       $ 目录
       --------------------------*/
      /*
       desktop
       myapp
       overrun
       overrun-leader
       */


      .state('desktop', {
        url: "/desktop",
        controller: 'DesktopCtrl',
        templateUrl: app_base + 'desktop/desktop.html',
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'desktop/js/desktopCtrl.js',
              // todo：highcharts 部分不应该在此处
              bower_base + 'highcharts/highcharts.js',
              bower_base + 'highcharts-ng/dist/highcharts-ng.min.js'
            ]);
          }]
        }
      })
      .state('myapp', {
        url: "/myapp",
        controller: 'MyappCtrl',
        templateUrl: app_base + 'myapp/myapp.html',
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'myapp/js/myappCtrl.js'
            ]);
          }]
        }
      })
      /*--------------------------
       $ overrun
       --------------------------*/
      .state('myapp.overrun', {
        url: '/overrun',
        templateUrl: app_base + 'overrun/overrun.html',
        controller: "OverrunCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'overrun/js/overrunCtrl.js'
            ]);
          }]
        }
      })
      .state('myapp.overrun.todo', {
        url: '/todo',
        templateUrl: app_base + 'overrun/partials/todo.html',
        controller: "OverrunTodoCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'overrun/js/overrunTodoCtrl.js'
            ]);
          }]
        }
      })
      .state('myapp.overrun.done', {
        url: '/done',
        templateUrl: app_base + 'overrun/partials/done.html',
        controller: "OverrunDoneCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'overrun/js/overrunDoneCtrl.js'
            ]);
          }]
        }
      })

      /*--------------------------
        $ overrun-leader
      --------------------------*/
      .state('myapp.overrun-leader', {
        url: '/overrun-leader',
        templateUrl: app_base + 'overrun-leader/overrun-leader.html',
        controller: "OverrunLeaderCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'overrun-leader/js/overrunLeaderCtrl.js'
            ]);
          }]
        }
      })
      .state('myapp.overrun-leader.todo', {
        url: '/todo',
        templateUrl: app_base + 'overrun-leader/partials/todo.html',
        controller: "OverrunLeaderTodoCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'overrun-leader/js/overrunLeaderTodoCtrl.js'
            ]);
          }]
        }
      })
      /*--------------------------
        $ overrun-admin
      --------------------------*/
      .state('myapp.overrun-admin', {
        url: '/overrun-admin',
        templateUrl: app_base + 'overrun-admin/overrun-admin.html',
        controller: "OverrunAdminCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'overrun-admin/js/overrunAdminCtrl.js'
            ]);
          }]
        }
      })
      .state('myapp.overrun-admin.dept', {
        url: '/dept',
        templateUrl: app_base + 'overrun-admin/partials/dept.html',
        controller: "OverrunAdminDeptCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'overrun-admin/js/overrunAdminDeptCtrl.js'
            ]);
          }]
        }
      })
      .state('myapp.overrun-admin.user', {
        url: '/user',
        templateUrl: app_base + 'overrun-admin/partials/user.html',
        controller: "OverrunAdminUserCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'overrun-admin/js/overrunAdminUserCtrl.js'
            ]);
          }]
        }
      })


      .state('myapp.monitor', {
        url: '/monitor',
        templateUrl: app_base + 'monitor/monitor.html',
        controller: "MonitorCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'monitor/js/monitorCtrl.js'
            ]);
          }]
        }
      })
      .state('myapp.sas', {
        url: '/sas',
        templateUrl: app_base + 'sas/sas.html',
        controller: "SasCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'sas/js/sasCtrl.js'
            ]);
          }]
        }
      })
      //.state('admin', {
      //  url: "/admin",
      //  controller: 'AdminCtrl',
      //  templateUrl: app_base + 'admin/admin.html',
      //  resolve: {
      //    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
      //      return $ocLazyLoad.load([
      //        app_base + 'admin/js/adminCtrl.js'
      //      ]);
      //    }]
      //  }
      //})


    // Without server side support html5 must be disabled.
    $locationProvider.html5Mode(false);

  })