angular.module('app.overrun').controller('OverrunReportCtrl',
  function ($scope, requestService, $modal, sliderService, $rootScope, $sce) {

    /*
     目录

     日期处理
     分页
     侧边栏
     打开设置
     导出
     */


    var path = '../apps/overrun/partials/';


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
    var ajAction  = '/api/cxcfs/' + exportDate + '/exportDetailExcel.do';
    // 监听 tjsj_search
    $scope.$watch('tjsj_search', function (value) {
      var date = moment(value)
      $scope.tjsj_title = date.format('YYYY年MM月')
      exportDate = date.format('YYYYMM')
      ybbAction = '/api/cxcfs/' + exportDate + '/exportYbbExcel.do';
      cgbAction = '/api/cxcfs/' + exportDate + '/exportCgbExcel.do';
      ajAction  = '/api/cxcfs/' + exportDate + '/exportDetailExcel.do';
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


    /*--------------------------
     $ 侧边栏
     --------------------------*/
    $scope.select = function (item) {
      $scope.selected = item
    }

    $scope.isSelected = function (item) {
      return $scope.selected == item ? "active" : "";
    }

    sliderService.initRequestMethod(requestService.overrunDoneItemDetail);
    $scope.mySliderToggle = function (item) {
      sliderService.setRequestData({aj_id: item.aj_id})
      if (!$scope.selected) {
        $scope.selected = item;
        sliderService.show()
      } else if ($scope.selected && $scope.selected === item) {
        $scope.selected = "";
        sliderService.hide()
      } else {
        $scope.selected = item;
        sliderService.showAfterHide()
      }
    }

    $rootScope.$on("row.clearSelected", function () {
      $scope.selected = "";
      $scope.$apply();
    })


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
     $ 导出
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
    // 案件详情
    $scope.export_aj = function () {
      formForDownload.attr('action', ajAction)
      formForDownload.submit();
    }

  });
