angular.module('app.overrun').controller('OverrunItemEditCtrl',
  function ($scope, $state, sliderService, $modalInstance, $modal,
            requestService, item, itemIsNew, ngToast, $anchorScroll, $location, $injector, forfeit, anchorSmoothScroll,
            Upload, carService, util) {

    /*
     功能目录：
     初始化
     下拉列表
     精度限制
     车牌
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
    var dateFormat = 'YYYY-MM-DD HH:mm';

    // 显示模块的内容
    /*$rootScope.$on("modal.content.show", function(){
     $scope.modal = {contentShow: true};
     })
     */

    /*--------------------------
     $ 下拉列表
     --------------------------*/
    /* 超限类型与标签变换 */
    $scope.overrunTypes = [
      {
        zz_label: '总重（吨）',
        cz_label: '超重（吨）',
        // name 是超限类型存于数据库
        name: '超重'
      },
      {
        zz_label: '总长（米）',
        cz_label: '超长（米）',
        name: '超长'
      }, {
        zz_label: '总宽（米）',
        cz_label: '超宽（米）',
        name: '超宽'
      }, {
        zz_label: '总高（米）',
        cz_label: '超高（米）',
        name: '超高'
      }, {
        zz_label: '集装箱总高（米）',
        cz_label: '集装箱超高（米）',
        name: '集装箱超高'
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
    // 设置表单变换的通用字段 总量/超量标签
    $scope.setOverrunType = function (type) {
      $scope.selectedOverrunType = type; // 前端内部使用
      $scope.item.cj_cxlx = type.name;  // name 用于超限类型
      // 更改总量/超量标签
      $scope.zz_label = type.zz_label; // 仅是标签
      $scope.cz_label = type.cz_label;
      // 更换类型时重置超量和罚金
      $scope.item.aj_fk = '';
      $scope.item.cj_zz = '';
      $scope.item.cj_cz = '';
      $scope.item.fj_zz = '';
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
    // 下拉列表初始化
    if (itemIsNew) {
      $scope.setOverrunType($scope.overrunTypes[0]);
      $scope.setUnloadType($scope.unloadTypes[0]);
      $scope.setGenderTypes($scope.genderTypes[0]);
    } else {
      $scope.setUnloadType(_matchTypes($scope.unloadTypes, $scope.item.cj_kfxz));
      $scope.setGenderTypes(_matchTypes($scope.genderTypes, $scope.item.jsy_xb));
      // 由于 setOverrunType 会重置超值，所以单独写
      var overrunType = _matchTypes($scope.overrunTypes, $scope.item.cj_cxlx)
      $scope.selectedOverrunType = overrunType;
      $scope.zz_label = overrunType.zz_label;
      $scope.cz_label = overrunType.cz_label;
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
     $ 精度限制
     --------------------------*/
    $scope.precisionLimit = function (e, fieldname, precision) {
      var elem = $(e.target);
      var oldVal = (+elem.val()), newVal;
      if (!oldVal) {
        return;
      }
      var count = util.countDecimals(oldVal)
      // 1）超限精度 2）其他参数指定的精度
      if (!precision) {
        precision = _getOvertypePrecision();
      }
      if (count > precision) {
        newVal = oldVal.toFixed(precision)
        elem.val(newVal)
        $scope.item[fieldname] = newVal;
      }
    }
    // 仅是超限精度
    function _getOvertypePrecision() {
      if ($scope.selectedOverrunType.name == '超重') {
        return 3;
      } else {
        return 2;
      }
    }

    /*--------------------------
     $ 车牌
     --------------------------*/



    $scope.carData = carService.carData;
    var cp_part_1;
    // 注：angucomplete 的用法
    // 车牌第一部分：下拉选中
    $scope.carSelected = function(selected){
      cp_part_1 = selected.title;
      $scope.item.cj_cp = cp_part_1 + $scope.cp_2;
    }
    // 车牌第一部分：手输
    $scope.angucompleteInputChanged = function(value) {
      cp_part_1 = value;
      $scope.item.cj_cp = cp_part_1 + $scope.cp_2;
      console.log('angucompleteInputChanged', $scope.item.cj_cp);
    }
    // 车牌第二部分
    $scope.$watch('cp_part_2', function (cp_part_2) {
      $scope.item.cj_cp = cp_part_1 + cp_part_2;
      console.log('cp_2',$scope.item.cj_cp);
    })

    /*--------------------------
     $ 日期设置
     --------------------------*/
    // todo：openDatepicker 必须的吗 ?
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

    // 时间初始化
    var date = moment().format(dateFormat);
    // 复检时间：只要单号为空，每次都生成时间
    if (!$scope.item.fj_dh || $scope.item.fj_dh == '') {
      $scope.item.fj_sj = date
    }
    if (itemIsNew) {
      $scope.item.cj_sj = date
      $scope.item.aj_afsj = date
      $scope.item.aj_xcblsj = moment().add(16, 'minutes').format(dateFormat);
      $scope.item.aj_xwblsj = moment().add(32, 'minutes').format(dateFormat);
      $scope.item.fj_sj = date
    }

    /*--------------------------
     $ 罚金计算
     --------------------------*/
    // 计算初检超值/罚金
    $scope.calcChecklistOverValue = function () {
      if (!$scope.item.cj_zz || $scope.item.cj_zz == '') {
        return;
      }
      var resutl = forfeit.calcOverForfeit($scope.selectedOverrunType.name, $scope.item.cj_zz, $scope.item.cj_zs);
      $scope.item.cj_cz = resutl.overValue;
      $scope.item.aj_fk = resutl.forfeit;
    }
    // 计算复检超值
    $scope.calcReChecklistOverValue = function () {
      if (!$scope.item.fj_zz || $scope.item.fj_zz == '') {
        return;
      }
      var resutl = forfeit.calcOverForfeit($scope.selectedOverrunType.name, $scope.item.fj_zz, $scope.item.cj_zs);
      $scope.item.fj_cz = resutl.overValue;
    }

    /*--------------------------
     $ 证件获取
     --------------------------*/
    $scope.sceneImages = [];
    $scope.vehicleImages = [];
    $scope.driverImages = [];
    $scope.billImages = [];

    // 证件初始化
    if (!itemIsNew) {
      _loadImage($scope.item.aj_id, 'sceneImages');
      _loadImage($scope.item.aj_id, 'vehicleImages');
      _loadImage($scope.item.aj_id, 'driverImages');
      _loadImage($scope.item.aj_id, 'billImages');
    }

    // date 是业务信息，file 是文件本身
    function _loadImage(dataid, datatype) {
      requestService.queryImages({
        dataid: dataid,
        datatype: datatype
      }).success(function (res) {
        $scope[datatype] = res.data;
      })
    }

    /*--------------------------
     $ 证件上传
     --------------------------*/
    $scope.$watch('sceneFiles', function () {
      $scope.upload($scope.sceneFiles, 'sceneImages');
    });

    $scope.$watch('vehicleFiles', function () {
      $scope.upload($scope.vehicleFiles, 'vehicleImages');
    });

    $scope.$watch('driverFiles', function () {
      $scope.upload($scope.driverFiles, 'driverImages');
    });

    $scope.$watch('billFiles', function () {
      $scope.upload($scope.billFiles, 'billImages');
    });

    $scope.upload = function (files, datatype) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          Upload.upload({
            // todo：图片上传接口内部实现暴露了
            url: '/api/files/' + $scope.item.aj_id + '/insert.do',
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
            $scope[datatype].push(res.data)
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
      $scope.item.cj_sj = moment($scope.item.cj_sj).format(dateFormat)
      $scope.item.fj_sj = moment($scope.item.fj_sj).format(dateFormat)
      $scope.item.aj_afsj = moment($scope.item.aj_afsj).format(dateFormat)
      $scope.item.aj_xcblsj = moment($scope.item.aj_xcblsj).format(dateFormat)
      $scope.item.aj_xwblsj = moment($scope.item.aj_xwblsj).format(dateFormat)

      /*// 处理总量/超量
       // 初检单
       $scope.item[$scope.selectedOverrunType.checklistValueField] = $scope.checklistValue;
       $scope.item[$scope.selectedOverrunType.checklistOverValueField] = $scope.checklistOverValue;
       // 复检单
       $scope.item[$scope.selectedOverrunType.reChecklistValueField] = $scope.reChecklistValue;
       $scope.item[$scope.selectedOverrunType.reChecklistOverValueField] = $scope.reChecklistOverValue;*/

      // 新增和更新用不同的接口
      console.log(item);
      console.dir(item);

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
