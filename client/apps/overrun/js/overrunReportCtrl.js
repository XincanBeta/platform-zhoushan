angular.module('app.overrun').controller('OverrunReportCtrl',
  function ($scope, requestService, $modal, sliderService, $rootScope, $sce) {

    /*
     目录

     日期处理
     分页
     打开设置
     月报表、抄告表导出
     案件详情导出
     */

    /*--------------------------
     $ 日期处理
     --------------------------*/
    // 初始化
    var date = moment().add(0, 'months')
    $scope.tjsj_search = date.format('YYYY-MM')
    $scope.tjsj_title = date.format('YYYY年MM月')
    var exportDate = date.format('YYYYMM')
    var ybbAction = '/api/cxcfs/' + exportDate + '/exportYbbExcel.do';
    var cgbAction = '/api/cxcfs/' + exportDate + '/exportCgbExcel.do';
    // 监听 tjsj_search
    $scope.$watch('tjsj_search', function (value) {
      var date = moment(value)
      $scope.tjsj_title = date.format('YYYY年MM月')
      exportDate = date.format('YYYYMM')
      ybbAction = '/api/cxcfs/' + exportDate + '/exportYbbExcel.do';
      cgbAction = '/api/cxcfs/' + exportDate + '/exportCgbExcel.do';
      $scope.pagingAct();
    })

    /*--------------------------
     $ 分页
     --------------------------*/
    $scope.pagingAct = function (str, currentPage) {
      $scope.currentPage = currentPage || 1;
      $scope.pageSize = 20; // 每页显示 20 条
      requestService.overrunReportQueryPage({
        exportDate: exportDate,
        currentPage: $scope.currentPage,
        pageSize: $scope.pageSize
      }).success(function (res) {
        if (res.success) {
          $scope.itemList = res.data.list;
          $scope.total = res.data.total;
        }
      })
    }
    // 刷新 1：页面初始化
    $scope.pagingAct();
    // 刷新 2：用于保存成功后的调用
    $rootScope.$on("paging.act", $scope.pagingAct)


    var path = '../apps/overrun/partials/';
    /*--------------------------
     $ 打开设置
     --------------------------*/
    $scope.setting = function () {
      var modalInstance
      modalInstance = $modal.open({
        backdrop: "static",
        keyboard: false,
        size: "md",
        templateUrl: path + 'report-setting.html',
        controller: 'OverrunReportSettingCtrl'
      })

      modalInstance.opened.then(function () {
        sliderService.stopAutoHide();
      })

      modalInstance.result.then(function () {
        sliderService.startAutoHide();
      }, function () {
        sliderService.startAutoHide();
      });
    }


    /*--------------------------
     $ 月报表、抄告表导出
     --------------------------*/
    var formForDownload = $("#formForDownload")
    // 月报表
    $scope.export_ybb = function () {
      formForDownload.attr('action', ybbAction)
      formForDownload.submit();
    }
    // 抄告表
    $scope.export_cgb = function () {
      formForDownload.attr('action', cgbAction)
      formForDownload.submit();
    }

    /*--------------------------
     $ 案件详情导出
    --------------------------*/
    $scope.selectAllItem = function () {
      // 通过 ng-checked="item.selected" 来控制列表项的 checkbox 状态
      // ng-checked 只能反映 checkbox 的状态
      // ng-model 能改变状态
      $scope._($scope.itemList).each(function (item) {
        item.selected = $scope.allItemIsChecked;
      });
    }

    $scope.selectItem = function ($event) {
      $event.stopPropagation();
    }
  });
