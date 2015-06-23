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
       overrun-group
       contact
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
        url: '/todo?notid',
        templateUrl: app_base + 'overrun/partials/todo.html',
        controller: "OverrunTodoCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'overrun/js/overrunTodoCtrl.js',
              app_base + 'overrun/js/overrunItemDetailCtrl.js',
              app_base + 'overrun/js/overrunItemDetailPhotoCtrl.js',
              app_base + 'overrun/js/overrunItemEditCtrl.js',
              app_base + 'overrun/js/overrunItemDeleteCtrl.js',
              app_base + 'overrun/js/overrunForfeitService.js', // 服务
              app_base + 'overrun/js/overrunViewerFullscreenCtrl.js',
              app_base + 'overrun/js/overrunViewerCtrl.js',
              app_base + 'overrun/js/overrunPhotoDetailCtrl.js',
              app_base + 'overrun/js/overrunItemDiscussCtrl.js'
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
      .state('myapp.overrun.report', {
        url: '/report',
        templateUrl: app_base + 'overrun/partials/report.html',
        controller: "OverrunReportCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'overrun/js/overrunReportCtrl.js'
            ]);
          }]
        }
      })
      /*--------------------------
        $ overrun-group
      --------------------------*/
      .state('myapp.overrun-group', {
        url: '/overrun-group',
        templateUrl: app_base + 'overrun-group/overrun-group.html',
        controller: "OverrunGroupCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'overrun-group/js/overrunGroupCtrl.js'
            ]);
          }]
        }
      })
      .state('myapp.overrun-group.todo', {
        url: '/todo?notid', // notid 罚金修改的消息通知
        templateUrl: app_base + 'overrun-group/partials/todo.html',
        controller: "OverrunGroupTodoCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'overrun-group/js/overrunGroupTodoCtrl.js'
            ]);
          }]
        }
      })
      .state('myapp.overrun-group.done', {
        url: '/done',
        templateUrl: app_base + 'overrun-group/partials/done.html',
        controller: "OverrunGroupDoneCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'overrun-group/js/overrunGroupDoneCtrl.js'
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
      .state('myapp.overrun-admin.item', {
        url: '/item',
        templateUrl: app_base + 'overrun-admin/partials/item.html',
        controller: "OverrunAdminItemCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'overrun-admin/js/overrunAdminItemCtrl.js'
            ]);
          }]
        }
      })
      .state('myapp.overrun-admin.dict', {
        url: '/dict',
        templateUrl: app_base + 'overrun-admin/partials/dict.html',
        controller: "OverrunAdminDictCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'overrun-admin/js/overrunAdminDictCtrl.js'
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
      /*--------------------------
       $ contact
      --------------------------*/
      .state('contact', {
        url: "/contact",
        controller: 'ContactCtrl',
        templateUrl: app_base + 'contact/contact.html',
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'contact/js/contactCtrl.js'
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