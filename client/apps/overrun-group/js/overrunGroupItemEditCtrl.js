angular.module('app.overrun-group').controller('OverrunGroupItemEditCtrl', function ($scope, sliderService, $modalInstance, $modal,
                                                                                     requestService, item, myToast, $rootScope) {

  /*
   初始化
   表单
   保存
   确定
   */

  /*--------------------------
   $ 初始化
   --------------------------*/
  // 重置 item 为 jttl
  $scope.item = item.jttl;
  // 初始化集体讨论罚款金额
  $scope.item.aj_fk = item.aj_fk;
  // 单独设置自由裁量权
  $scope.cj_zyclq = item.cj_zyclq


  /*--------------------------
   $ 表单
   --------------------------*/
  var dateFormat = 'YYYY-MM-DD HH:mm';
  $scope.openDatepicker = {
    jt_sj: false
  };
  $scope.dateOptions = {
    showWeeks: false, // 标准
    startingDay: 1 // 周一开始
  };
  $scope.timeOptions = {
    //readonlyInput: true,
    showMeridian: false // meridian false 为 24小时制
  };
  $scope.openCalendar = function (e, dateField) {
    e.preventDefault();
    e.stopPropagation();
    $scope.openDatepicker[dateField] = true;
  };

  // 时间初始化
  if (!$scope.item.jt_sj) {
    var date = moment().format(dateFormat);
    $scope.item.jt_sj = date
  }

  // 正常关闭本层
  $scope.closeModal = function () {
    $modalInstance.close();
  }
  // 错误关闭本层
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  }


  /*--------------------------
   $ 保存
   --------------------------*/
  $scope.save = function () {
    if(isJttlDone()){
      myToast.failureTip('集体讨论已完成，关闭修改');
      return;
    }
    requestService.overrunGroupItemUpdate($scope.item).success(function (res) {
      if (res.success) {
        myToast.successTip();
        $rootScope.$emit("paging.act")
        $modalInstance.close();
      }
    }).error(function () {
      myToast.failureTip();
    })
  }


  /*--------------------------
   $ 确定
   --------------------------*/
  $scope.confirm = function () {
    if(isJttlDone()){
      myToast.failureTip('集体讨论已完成，关闭修改');
      return;
    }
    if( isOverZyclq() ){
      if( !validateFieldRequired() ){
        return;
      }
    }
    $scope.item.jt_zt = '已完成';
    requestService.overrunGroupItemUpdate($scope.item).success(function (res) {
      if (res.success) {
        $rootScope.$emit("slider.hide")
        myToast.successTip('操作成功！');
        $rootScope.$emit("paging.act")
        $modalInstance.close();
        // 发送消息通知
        requestService.getNewId().success(function (res) {
          requestService.notiInsert({
            notid: res.data,
            appid: "0101", // appid 给 后端做关联 ，overrun
            route: "myapp.overrun.todo",
            content: "已确定了 车牌为 " + item.cj_cp + " 案件 的罚金修改"
          }).success(function (res) {
            console.log('发送消息通知', res);
            $rootScope.$emit("noti.refresh")
          })
        })
      }
    }).error(function () {
      myToast.failureTip('操作失败！');
    })
  }



  /*--------------------------
   $ 辅助函数
   --------------------------*/

  function _getRangeForZyclq(){
    var reg = /(\d+)-(\d+)/g
    var result = reg.exec($scope.cj_zyclq)
    if(!result){
      throw '超出自由裁量权，自由裁量权格式错误'
    }
    return [result[1], result[2]]
  }

  function isOverZyclq(){
    var isOver = false;
    // 获取自由裁量权范围
    var zyclqRange = _getRangeForZyclq()
    if( $scope.item.aj_fk < zyclqRange[0] || $scope.item.aj_fk > zyclqRange[1]){
      isOver = true
    }
    return isOver;
  }

  function validateFieldRequired(){
    for(var p in $scope.item){
      if($scope.item.hasOwnProperty(p)){
        if(!$scope.item[p]){
          myToast.failureTip('请先填写所有信息');
          return false;
        }
      }
    }
    return true;
  }

  function isJttlDone(){
    if($scope.item.jt_zt == '已完成'){
      return true;
    }
    return false;
  }








}) // controller
