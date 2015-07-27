angular.module('app.overrun-group').controller('OverrunGroupItemEditCtrl', function ($scope, sliderService, $modalInstance, $modal,
                                                                                     requestService, item, myToast, $rootScope) {

  /*
   初始化
   时间
   监听罚款金额
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

  // 功能锁
  $scope.isLocked = false;
  function _before(){
    $scope.isLocked = true;
  }
  function _after(){
    $scope.isLocked = false;
  }

  /*--------------------------
   $ 时间
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

  if (!$scope.item.jt_sj) {
    var date = moment().format(dateFormat);
    $scope.item.jt_sj = date
  }


  /*--------------------------
   $ 监听罚款金额
   禁用无需填的表单域
  --------------------------*/
  $scope.$watch('item.aj_fk', function(){
    var inputs = $('#jttl-modal-body').find(':input')
    if( isOverZyclq() ){
      inputs.prop('disabled', false) // 都要填
      $('#jttl-aj-fk').css('color', '#428bca')
    }else{
      inputs.prop('disabled', true)
      $('#jttl-aj-fk').prop('disabled', false).css('color', '#555') // 只填罚款
    }
  })


  /*--------------------------
   $ 保存
   --------------------------*/
  $scope.save = function () {
    _before();
    /*if(isJttlDone()){
      myToast.failureTip('集体讨论已完成，已关闭');
      return;
    }*/
    requestService.overrunGroupItemUpdate($scope.item).success(function (res) {
      _after();
      if (res.success) {
        myToast.successTip();
        $rootScope.$emit("paging.act")
        $modalInstance.close();
      }
    }).error(function () {
      _after();
      myToast.failureTip();
    })
  }


  /*--------------------------
   $ 确定
   --------------------------*/
  $scope.confirm = function () {
    _before();
    /*if(isJttlDone()){
      myToast.failureTip('集体讨论已完成，关闭修改');
      return;
    }*/
    if( isOverZyclq() ){
      if( !validateFieldRequired() ){
        _after();
        return;
      }
    }
    $scope.item.jt_zt = '已完成';
    requestService.overrunGroupItemUpdate($scope.item).success(function (res) {
      _after();
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
      _after();
      myToast.failureTip('操作失败！');
    })
  }


  $scope.isJttlDone = function(){
    if($scope.item.jt_zt == '已完成'){
      return true;
    }
    return false;
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
   $ 辅助函数
   --------------------------*/

  function _getRangeForZyclq(){
    var reg = /(\d+)-(\d+)/g
    var result = reg.exec($scope.cj_zyclq)
    if(!result){
      throw '超出自由裁量权，自由裁量权格式错误'
    }
    return [parseInt(result[1],10), parseInt(result[2],10)]
  }

  function isOverZyclq(){
    var isOver = false;
    // 获取自由裁量权范围
    var zyclqRange = _getRangeForZyclq()
    var aj_fk = parseInt($scope.item.aj_fk, 10)
    if( aj_fk < zyclqRange[0] || aj_fk > zyclqRange[1]){
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



}) // controller
