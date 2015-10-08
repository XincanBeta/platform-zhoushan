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
       overrun-admin
       // 非现场
       non-overrun
       non-overrun-group
       non-overrun-admin
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

      /*--------------------------
       $ non-overrun
       --------------------------*/
      .state('myapp.non-overrun', {
        url: '/non-overrun',
        templateUrl: app_base + 'non-overrun/non-overrun.html',
        controller: "NonOverrunCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'non-overrun/js/nonOverrunCtrl.js'
            ]);
          }]
        }
      })
      .state('myapp.non-overrun.filter', {
        url: '/filter?notid',
        templateUrl: app_base + 'non-overrun/partials/filter.html',
        controller: "NonOverrunFilterCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'non-overrun/js/nonOverrunFilterCtrl.js'
            ]);
          }]
        }
      })
      .state('myapp.non-overrun.todo', {
        url: '/todo?notid',
        templateUrl: app_base + 'non-overrun/partials/todo.html',
        controller: "NonOverrunTodoCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'non-overrun/js/nonOverrunTodoCtrl.js'
            ]);
          }]
        }
      })
      .state('myapp.non-overrun.done', {
        url: '/done',
        templateUrl: app_base + 'non-overrun/partials/done.html',
        controller: "NonOverrunDoneCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'non-overrun/js/nonOverrunDoneCtrl.js'
            ]);
          }]
        }
      })
      .state('myapp.non-overrun.report', {
        url: '/report',
        templateUrl: app_base + 'non-overrun/partials/report.html',
        controller: "NonOverrunReportCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'non-overrun/js/nonOverrunReportCtrl.js'
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
      .state('myapp.sas.main', {
        url: '/sas.main',
        templateUrl: app_base + 'sas/partials/main.html'
      })
      .state('myapp.sas.jtlldcz', {
        url: '/sas.jtlldcz',
        templateUrl: app_base + 'sas/partials/jtlldcz.html'
      })
      .state('myapp.sas.sjcj', {
        url: '/sas.sjcj',
        templateUrl: app_base + 'sas/partials/sjcj.html'
      })
      .state('myapp.sas.holiday', {
        url: '/sas.holiday',
        templateUrl: app_base + 'sas/partials/holiday.html'
      })
      .state('myapp.sas.dczList', {
        url: '/sas.dczList',
        templateUrl: app_base + 'sas/partials/dczList.html'
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
      .state('contact.list', {
        url: '/list?dwid',
        templateUrl: app_base + 'contact/partials/list.html',
        controller: "ContactListCtrl",
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              app_base + 'contact/js/contactListCtrl.js'
            ]);
          }]
        }
      })

    // Without server side support html5 must be disabled.
    $locationProvider.html5Mode(false);

  })