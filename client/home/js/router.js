angular.module('app')
  .config(function ($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    var app_base = "../apps/", bower_base = "../assets/lib/"
    $urlRouterProvider.otherwise("/");
    $stateProvider
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

      .state('myapp.overrun.forfeit', {
        url: '/forfeit',
        templateUrl: app_base + 'overrun/partials/forfeit.html',
        controller: "OverrunForfeitCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'overrun/js/overrunForfeitCtrl.js'
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
      .state('admin', {
        url: "/admin",
        controller: 'AdminCtrl',
        templateUrl: app_base + 'admin/admin.html',
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'admin/js/adminCtrl.js'
            ]);
          }]
        }
      })
      .state('admin.dept', {
        url: '/dept',
        templateUrl: app_base + 'admin/partials/dept.html',
        controller: "AdminDeptCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'admin/js/adminDeptCtrl.js'
            ]);
          }]
        }
      })
      .state('admin.user', {
        url: '/user',
        templateUrl: app_base + 'admin/partials/user.html',
        controller: "AdminUserCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'admin/js/adminUserCtrl.js'
            ]);
          }]
        }
      })

    // Without server side support html5 must be disabled.
    $locationProvider.html5Mode(false);

  })