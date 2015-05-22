angular.module('app.overrun').controller('OverrunEditCtrl',
  function ($scope, $state, sliderService, $modalInstance, $modal,
            requestService, item, ngToast, $anchorScroll, $location, $injector, forfeit, anchorSmoothScroll,
            Upload, $rootScope) {

    /*
     功能目录：

     初始化（一）
     表单域处理
     下拉列表与表单变换
     驾驶员数据关联
     车辆信息关联
     时间控件
     罚金计算
     证件获取
     证件上传
     证件删除
     页内导航
     验证与格式化
     页脚操作
     初始化（二）
     工具函数
     */

    /*--------------------------
     $ 初始化（一）
     --------------------------*/
    $scope.item = item;
    //console.log($scope.item);
    var dateFormat = 'YYYY-MM-DD HH:mm';
    if (isNew()) {
      // 获取一个 id
      //var idPromise = requestService.getNewId()
      // 返回一个 promise
    }
    // 显示模块的内容
    $rootScope.$on("modal.content.show", function(){
      $scope.modal = {contentShow: true};
    })



    
    /*--------------------------
     $ 表单域处理
     --------------------------*/
    /* 下拉列表与表单变换 */
    $scope.overrunTypes = [
      {
        label: '总重',
        name: '超重',
        checklistValueField: 'cjzz',
        checklistOverValueField: 'cjcz',
        reChecklistValueField: 'fjzz',
        reChecklistOverValueField: 'fjcz'
      },
      {
        label: '总长',
        name: '超长',
        checklistValueField: 'cjzc',
        checklistOverValueField: 'cjcc',
        reChecklistValueField: 'fjzc',
        reChecklistOverValueField: 'fjcc'
      }, {
        label: '总宽',
        name: '超宽',
        checklistValueField: 'cjzk',
        checklistOverValueField: 'cjck',
        reChecklistValueField: 'fjzk',
        reChecklistOverValueField: 'fjck'
      }, {
        label: '总高',
        name: '超高',
        checklistValueField: 'cjzg',
        checklistOverValueField: 'cjcg',
        reChecklistValueField: 'fjzg',
        reChecklistOverValueField: 'fjcg'
      }, {
        label: '集装箱总高',
        name: '集装箱超高',
        checklistValueField: 'cjjzxzg',
        checklistOverValueField: 'cjjzxcg',
        reChecklistValueField: 'fjjzxzg',
        reChecklistOverValueField: 'fjjzxcg'
      }
    ];
    $scope.unloadTypes = [
      {name: '可卸载'},
      {
        name: '不可卸载'
      }
    ];
    $scope.genderTypes = [
      {name: '男'},
      {
        name: '女'
      }
    ];
    $scope.partyTypes = [
      {name: '驾驶员'},
      {
        name: '公司',
        isDisabled: true
      },
      {
        name: '个人',
        isDisabled: true
      }
    ];
    // 设置表单变换的通用字段 总量/超量标签

    $scope.setOverrunType = function (type) {
      $scope.selectedOverrunType = type; // 前端内部使用
      $scope.item.cxlx = type.name;  // 对接使用
      // 更改总量/超量标签
      $scope.typeLabel = type.label;
      $scope.overTypeLabel = type.name;
      // 更换类型时重置超量和罚金
      $scope.item.fkje = '';
      $scope.checklistOverValue = '';
      $scope.reChecklistOverValue = '';

    };
    $scope.setUnloadType = function (type) {
      $scope.selectedUnloadType = type;
      $scope.item.kfxz = type.name;
    };
    $scope.setGenderTypes = function (type) {
      $scope.selectedGenderTypes = type;
      $scope.item.xccfJsy.xb = type.name;
    };
    $scope.setPartyTypes = function (type) {
      $scope.selectedPartyTypes = type;
      $scope.item.xccfDsr.dsrlx = type.name;
    };

    /*--------------------------
      $ 驾驶员数据关联
    --------------------------*/
    //如果当事人类型是驾驶员，关联出电话和住址
    $scope.$watch('item.xccfJsy.lxdh', function () {
      if ($scope.item.xccfDsr.dsrlx == '驾驶员') {
        $scope.item.xccfDsr.lxdh = $scope.item.xccfJsy.lxdh;
      }
    })

    $scope.$watch('item.xccfJsy.zz', function () {
      if ($scope.item.xccfDsr.dsrlx == '驾驶员') {
        $scope.item.xccfDsr.zz = $scope.item.xccfJsy.zz;
      }
    })

    /*--------------------------
      $ 车辆信息关联
    --------------------------*/
    // 单向关联车牌
    $scope.$watch('item.xccfCl.cp', function () {
      $scope.item.xccfCl.ct = $scope.item.xccfCl.cp;
    })



    /*--------------------------
     $ 时间控件
     --------------------------*/
    $scope.openDatepicker = {
      cjsj: false,
      fjsj: false
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


    /*--------------------------
     $ 罚金计算
     --------------------------*/
    // 满足 初检单/复检单的总量
    $scope.calcChecklistOverValue = function () {
      if (!$scope.checklistValue) {
        return;
      }
      var resutl = forfeit.calcOverForfeit($scope.selectedOverrunType.name, $scope.checklistValue, $scope.item.xccfCl.zs);
      $scope.checklistOverValue = resutl.overValue;
    }
    $scope.calcForfeit = function () {
      if (!$scope.checklistValue) {
        return;
      }
      var resutl = forfeit.calcOverForfeit($scope.selectedOverrunType.name, $scope.checklistValue, $scope.item.xccfCl.zs);
      $scope.item.fkje = resutl.forfeit;
    }
    $scope.calcReChecklistOverValue = function () {
      if (!$scope.reChecklistValue) {
        return;
      }
      var resutl = forfeit.calcOverForfeit($scope.selectedOverrunType.name, $scope.reChecklistValue, $scope.item.xccfCl.zs);
      $scope.reChecklistOverValue = resutl.overValue;
    }

    /*--------------------------
      $ 证件获取
    --------------------------*/
    $scope.vehicleImages = [];
    $scope.driverImages = [];
    $scope.billImages = [];

    /*$scope.vehicleImagePromise = $http.post('/api/files/query.do', {
      dataid: $scope.item.xccfid,
      datatype: 'vehicle'
    }).success(function (res) {
      var images = res.data;
      for (var i = 0; i < images.length; i++) {
        $scope.vehicleImages.push(images[i])
      }
    })*/


    /*--------------------------
     $ 证件上传
     --------------------------*/
    $scope.$watch('vehicleFiles', function () {
      $scope.upload($scope.vehicleFiles, 'vehicle');
    });

    $scope.$watch('driverFiles', function () {
      $scope.upload($scope.driverFiles, 'driver');
    });

    $scope.$watch('billFiles', function () {
      $scope.upload($scope.billFiles, 'bill');
    });


    /*$scope.uploadPhoto = function(){

    }*/
    $scope.upload = function (files, datatype) {
      // 等待 promise
      //if(idPromise){

      //}


      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          Upload.upload({
            url: '/api/files/' + $scope.item.xccfid + '/insert.do',
            fields: {
              isthumbnail: true,
              width: 400,
              height: 200,
              filetype: 'image',
              datatype: datatype
            },
            file: file
          }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('上传进度: ' + progressPercentage + '% ' + evt.config.file.name);
          }).success(function (res, status, headers, config) {
            console.log('文件 ' + config.file.name + '已经成功上传. 返回: ' + res);
            $scope.vehicleImages.push({
              thumbnaildata: res.data
            })
          });
        }
      }
    };
    /*--------------------------
     $ 证件删除
     --------------------------*/



    /*--------------------------
     $ 页内导航
     --------------------------*/
    $scope.gotoAnchor = function (id) {
      $location.hash(id);
      anchorSmoothScroll.scrollTo(id);
      //$anchorScroll();
    }


    /*--------------------------
     $ 验证与格式化
     --------------------------*/
    // todo：过滤空格


    /*--------------------------
     $ 页脚操作
     --------------------------*/


    $scope.save = function () {

      // fixme：格式化时间（临时方案）
      $scope.item.cjsj = moment($scope.item.cjsj).format(dateFormat)
      $scope.item.fjsj = moment($scope.item.fjsj).format(dateFormat)
      $scope.item.afsj = moment($scope.item.afsj).format(dateFormat)
      $scope.item.xcblsj = moment($scope.item.xcblsj).format(dateFormat)
      $scope.item.xwblsj = moment($scope.item.xwblsj).format(dateFormat)


      // 处理总量/超量
      // 初检单
      $scope.item[$scope.selectedOverrunType.checklistValueField] = $scope.checklistValue;
      $scope.item[$scope.selectedOverrunType.checklistOverValueField] = $scope.checklistOverValue;
      // 复检单
      $scope.item[$scope.selectedOverrunType.reChecklistValueField] = $scope.reChecklistValue;
      $scope.item[$scope.selectedOverrunType.reChecklistOverValueField] = $scope.reChecklistOverValue;


      if (isNew()) {
        requestService.overrunTodoItemSave($scope.item).success(function (res) {
          if (res.success) {
            ngToast.create({
              className: 'success',
              content: '保存成功!'
            });
            $modalInstance.close();
          } else {
            ngToast.create({
              className: 'danger',
              content: '保存失败!'
            });
          }
        })
      } else {
        // 更新
        requestService.overrunTodoItemUpdate($scope.item).success(function (res) {
          if (res.success) {
            ngToast.create({
              className: 'success',
              content: '保存成功!'
            })
            $modalInstance.close();
          } else {
            ngToast.create({
              className: 'danger',
              content: '保存失败!'
            });
          }
        })
      }
    }

    var apps = '../apps/'
    var fullscreenModalInstance
    // 结案
    $scope.done = function () {
      // 提示
      ngToast.create({
        className: 'success',
        content: '结案成功!'
      });


      // 全屏
      fullscreenModalInstance = $modal.open({
        keyboard: true,
        size: "fullscreen",
        templateUrl: apps + 'overrun/partials/docContentFullscreen-2.html'
      })
      fullscreenModalInstance.result.then(function () {
        sliderService.startAutoHide();
      }, function () {
        sliderService.startAutoHide();
      });

      fullscreenModalInstance.opened.then(function () {
        sliderService.stopAutoHide();
      })
    }
    // modalInstance.close 依赖 modalInstance.result 和 modalInstance.opened
    $scope.closeModal = function () {
      fullscreenModalInstance.close()
      // 依赖 item-edit，但又要关闭 edit modal
      $modalInstance.close();

    }

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    }


    /*--------------------------
     $ 初始化（二）
     新案件 item 初始化在 todoCtrl 中
     --------------------------*/
    if (isNew()) {
      // 时间控件：初始化
      var date = moment().format(dateFormat);// 未用 angular-moment
      $scope.item.cjsj = date
      $scope.item.fjsj = date
      $scope.item.afsj = date
      $scope.item.xcblsj = date
      $scope.item.xwblsj = date
      // 下拉列表
      $scope.setOverrunType($scope.overrunTypes[0]);
      $scope.setUnloadType($scope.unloadTypes[0]);
      $scope.setGenderTypes($scope.genderTypes[0]);
      $scope.setPartyTypes($scope.partyTypes[0]);
    } else {
      // 下拉列表
      $scope.setOverrunType(_matchTypes($scope.overrunTypes, $scope.item.cxlx));
      $scope.setUnloadType(_matchTypes($scope.unloadTypes, $scope.item.kfxz));
      $scope.setGenderTypes(_matchTypes($scope.genderTypes, $scope.item.xccfJsy.xb));
      $scope.setPartyTypes(_matchTypes($scope.partyTypes, $scope.item.xccfDsr.dsrlx));
    }

    function _matchTypes(types, name) {
      if (!name) {
        return types[0]
      }
      return $scope._(types).find(function (type) {
        return type.name == name;
      });
    }


    /*--------------------------
      $ 工具函数
    --------------------------*/
    // 判断是新增还是修改
    function isNew() {
      return !!(!$scope.item || !$scope.item.xccfid);
    }

  })
