angular.module('app.overrun').controller('OverrunEditCtrl',
  function ($scope, $state, sliderService, $modalInstance, $modal,
            requestService, item, itemIsNew, ngToast, $anchorScroll, $location, $injector, forfeit, anchorSmoothScroll,
            Upload, $rootScope) {

    /*
     功能目录：
     初始化
     表单域处理
     下拉列表与表单变换
     驾驶员数据关联
     日期设置
     罚金计算
     证件获取
     证件上传
     证件删除
     页内导航
     验证与格式化
     页脚操作
     */

    /*--------------------------
     $ 初始化
     --------------------------*/
    $scope.item = item;
    //console.log($scope.item);
    var dateFormat = 'YYYY-MM-DD HH:mm';

    // 显示模块的内容
    /*$rootScope.$on("modal.content.show", function(){
     $scope.modal = {contentShow: true};
     })
     */

    /*--------------------------
     $ 表单域处理
     --------------------------*/
    /* 超限类型与标签变换 */
    $scope.overrunTypes = [
      {
        zz_label: '总重',
        cz_label: '超重'
      },
      {
        zz_label: '总长',
        cz_label: '超长'
      }, {
        zz_label: '总宽',
        cz_label: '超宽'
      }, {
        zz_label: '总高',
        cz_label: '超高'
      }, {
        zz_label: '集装箱总高',
        cz_label: '集装箱超高'
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
    /*$scope.partyTypes = [
     {name: '驾驶员'},
     {
     name: '公司',
     isDisabled: true
     },
     {
     name: '个人',
     isDisabled: true
     }
     ];*/
    // 设置表单变换的通用字段 总量/超量标签

    $scope.setOverrunType = function (type) {
      $scope.selectedOverrunType = type; // 前端内部使用
      $scope.item.cj_cxlx = type.cz_label;  // 对接使用
      // 更改总量/超量标签
      $scope.zz_label = type.zz_label;
      $scope.cz_label = type.cz_label;
      // 更换类型时重置超量和罚金
      $scope.item.aj_fkje = '';
      $scope.item.cj_cz = '';
      $scope.item.fj_cz = '';
    };
    $scope.setUnloadType = function (type) {
      $scope.selectedUnloadType = type;
      $scope.item.cj_kfxz = type.name;
    };
    $scope.setGenderTypes = function (type) {
      $scope.selectedGenderTypes = type;
      $scope.item.jsy_xb = type.name;
    };

    /*--------------------------
     $ 日期设置
     --------------------------*/
    // todo：不是必须的？
    $scope.openDatepicker = {
      cj_sj: false,
      fj_sj: false,
      aj_xwblsj: false,
      aj_xcblsj: false,
      aj_afsj: false
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

    // 初始化
    if (itemIsNew) {
      var date = moment().format(dateFormat);// 未用 angular-moment
      $scope.item.cj_sj = date
      $scope.item.fj_sj = date
      $scope.item.aj_afsj = date
      $scope.item.aj_xcblsj = date
      $scope.item.aj_xwblsj = date
      // 下拉列表
      $scope.setOverrunType($scope.overrunTypes[0]);
      $scope.setUnloadType($scope.unloadTypes[0]);
      $scope.setGenderTypes($scope.genderTypes[0]);
      //$scope.setPartyTypes($scope.partyTypes[0]);
    } else {
      // 下拉列表
      $scope.setOverrunType(_matchTypes($scope.overrunTypes, $scope.item.cj_cxlx));
      $scope.setUnloadType(_matchTypes($scope.unloadTypes, $scope.item.cj_kfxz));
      $scope.setGenderTypes(_matchTypes($scope.genderTypes, $scope.item.jsy_xb));
      //$scope.setPartyTypes(_matchTypes($scope.partyTypes, $scope.item.xccfDsr.dsrlx));
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
     $ 罚金计算
     --------------------------*/
    // 计算初检超值
    $scope.calcChecklistOverValue = function () {
      if (!$scope.cj_zz) {
        return;
      }
      var resutl = forfeit.calcOverForfeit($scope.selectedOverrunType.name, $scope.cj_zz, $scope.item.cj_zs);
      $scope.cj_cz = resutl.overValue;
    }
    // 计算初检罚金
    $scope.calcForfeit = function () {
      if (!$scope.checklistValue) {
        return;
      }
      var resutl = forfeit.calcOverForfeit($scope.selectedOverrunType.name, $scope.cj_zz, $scope.item.cj_zs);
      $scope.item.aj_fkje = resutl.forfeit;
    }
    // 计算复检超值
    $scope.calcReChecklistOverValue = function () {
      if (!$scope.fj_zz) {
        return;
      }
      var resutl = forfeit.calcOverForfeit($scope.selectedOverrunType.name, $scope.fj_zz, $scope.item.cj_zs);
      $scope.fj_zz = resutl.overValue;
    }

    /*--------------------------
     $ 证件获取
     --------------------------*/
    $scope.sceneImages = [];
    $scope.vehicleImages = [];
    $scope.driverImages = [];
    $scope.billImages = [];

    _loadImage($scope.item.aj_id, 'scene', $scope.sceneImages);
    _loadImage($scope.item.aj_id, 'vehicle', $scope.vehicleImages);
    _loadImage($scope.item.aj_id, 'driver', $scope.driverImages);
    _loadImage($scope.item.aj_id, 'bill', $scope.billImages);
    // date 是业务信息，file 是文件本身
    function _loadImage(dateid, datetype, images) {
      requestService.queryFiles({
        dateid: dateid,
        datetype: datetype
      }).success(function (res) {
        images = res.data;
      })
    }

    /*--------------------------
     $ 证件上传
     --------------------------*/
    $scope.$watch('sceneFiles', function () {
      $scope.upload($scope.sceneFiles, 'scene', $scope.sceneImages);
    });

    $scope.$watch('vehicleFiles', function () {
      $scope.upload($scope.vehicleFiles, 'vehicle', $scope.vehicleImages);
    });

    $scope.$watch('driverFiles', function () {
      $scope.upload($scope.driverFiles, 'driver', $scope.driverImages);
    });

    $scope.$watch('billFiles', function () {
      $scope.upload($scope.billFiles, 'bill', $scope.billImages);
    });

    $scope.upload = function (files, datatype, images) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          Upload.upload({
            // todo：图片上传接口内部实现暴露了
            url: '/api/files/' + $scope.item.xccfid + '/insert.do',
            fields: {
              isthumbnail: true,
              width: 400,
              height: 200,
              // 文件类型
              filetype: 'image',
              // 业务类型
              datatype: datatype
            },
            file: file
          }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('上传进度: ' + progressPercentage + '% ' + evt.config.file.name);
          }).success(function (res, status, headers, config) {
            console.log('文件 ' + config.file.name + '已经成功上传. 返回: ' + res);
            images.push(res.data)
          });
        }
      }
    };
    /*--------------------------
     $ 证件删除
     --------------------------*/
    $scope.deleteImage = function (images, image) {
      requestService.deleteFile(image.fileid).success(function (res) {
        if (res.success) {
          for (var i = 0; i < images.length; i++) {
            if (images[i].fileid == image.fileid) {
              images.splice(i, 1);
            }
          }
          ngToast.create({
            className: 'success',
            content: '删除成功!'
          });
        }
      }).error(function () {
        ngToast.create({
          className: 'danger',
          content: '删除失败!'
        });
      })
    }


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
      $scope.item.cjsj = moment($scope.item.cj_sj).format(dateFormat)
      $scope.item.fjsj = moment($scope.item.fj_sj).format(dateFormat)
      $scope.item.afsj = moment($scope.item.aj_afsj).format(dateFormat)
      $scope.item.xcblsj = moment($scope.item.aj_xcblsj).format(dateFormat)
      $scope.item.xwblsj = moment($scope.item.aj_xwblsj).format(dateFormat)

      /*// 处理总量/超量
       // 初检单
       $scope.item[$scope.selectedOverrunType.checklistValueField] = $scope.checklistValue;
       $scope.item[$scope.selectedOverrunType.checklistOverValueField] = $scope.checklistOverValue;
       // 复检单
       $scope.item[$scope.selectedOverrunType.reChecklistValueField] = $scope.reChecklistValue;
       $scope.item[$scope.selectedOverrunType.reChecklistOverValueField] = $scope.reChecklistOverValue;*/

      // 新增和更新用不同的接口
      if (itemIsNew) {
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
    var fullscreenModalInstance;
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


  })
