angular.module('app.overrun').controller('OverrunItemEditCtrl',
  function ($scope, $state, sliderService, $modalInstance, $modal,
            requestService, item, itemIsNew, ngToast, $anchorScroll, $location, $injector, forfeit, anchorSmoothScroll,
            Upload, carService, util, $q) {

    /*
     初始化
     下拉列表
     精度限制
     车牌录入
     车牌获取
     日期设置
     罚金计算
     证件获取
     证件上传
     证件删除
     页内导航
     验证与格式化
     保存
     结案
     填充（临时）
     */

    //调试帮助：区分 $scope 上的 item 与 普通值


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
     $ 车牌录入
     --------------------------*/
    $scope.carData = carService.carData;
    var cp_part_1, cp_part_2;
    // 注：angucomplete 的用法
    // 车牌第一部分：下拉选中
    $scope.carSelected = function (selected) {
      if (selected) {
        cp_part_1 = selected.title.toUpperCase();
      }
      if (cp_part_2) {
        _setCP();
      }
    }
    // 车牌第一部分：手输
    $scope.angucompleteInputChanged = function (value) {
      if (value) {
        cp_part_1 = value.toUpperCase();
      }
      if (cp_part_2) {
        _setCP();
      }
    }
    // 车牌第二部分
    $scope.$watch('cp_part_2', function (value) {
      if (value) {
        cp_part_2 = value.toUpperCase()
        $scope.cp_part_2 = value.toUpperCase();
      }
      if (cp_part_1) {
        _setCP();
      }
    })
    function _setCP() {
      $scope.item.cj_cp = cp_part_1 + cp_part_2;
    }

    /*--------------------------
     $ 车牌获取
     --------------------------*/
    if (!itemIsNew && $scope.item.cj_cp) {
      $scope.cp_part_1 = $scope.item.cj_cp.substring(0, 2);
      $scope.cp_part_2 = $scope.item.cj_cp.substring(2);
    }


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
     $ 保存
     --------------------------*/
    function _beforeSave() {
      // fixme：格式化时间（临时方案）
      $scope.item.cj_sj = moment($scope.item.cj_sj).format(dateFormat)
      $scope.item.fj_sj = moment($scope.item.fj_sj).format(dateFormat)
      $scope.item.aj_afsj = moment($scope.item.aj_afsj).format(dateFormat)
      $scope.item.aj_xcblsj = moment($scope.item.aj_xcblsj).format(dateFormat)
      $scope.item.aj_xwblsj = moment($scope.item.aj_xwblsj).format(dateFormat)
    }


    $scope.save = function () {
      _beforeSave();
      var savePromise;
      if (itemIsNew) {
        savePromise = requestService.overrunTodoItemSave($scope.item)
      } else {
        savePromise = requestService.overrunTodoItemUpdate($scope.item)
      }
      $q.all(savePromise).then(function (res) {
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

    /*--------------------------
     $ 结案
     --------------------------*/
    var apps = '../apps/'
    var fullscreenModalInstance;
    $scope.done = function () {
      var savePromise;
      // 先保存
      _beforeSave();
      if (itemIsNew) {
        savePromise = requestService.overrunTodoItemSave($scope.item)
      } else {
        savePromise = requestService.overrunTodoItemUpdate($scope.item)
      }
      $q.all(savePromise).then(function (result) {
        console.log('result = ', result);
      })


      /*// 提示
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
       })*/
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
     $ 填充
     --------------------------*/
    $scope.fillData = function () {
      var item = {
        "dw_bh": "01",
        "aj_bh": "11",
        "cj_dh": "00001",
        "cj_sj": "2015-05-26 19:00",
        "cj_cxlx": "超重",
        "cj_kfxz": "可卸载",
        "cj_cp": "浙AFFFFF",
        "cj_zs": 2,
        "cj_zz": 22,
        "cj_cz": 2,
        "hw_mc": "煤",
        "hw_qd": "山西",
        "hw_md": "背景",
        "cl_hdzzl": 18,
        "cl_zbzl": 19,
        "cl_cjd": "杭州",
        "cl_lx": "普通",
        "cl_yyz": "331081222233445",
        "cl_syr": "阿三",
        "cl_zz": "杭州 XXXX 街道",
        "cl_dh": "13575760977",
        "jsy_xm": "阿三",
        "jsy_xb": "男",
        "jsy_zh": "1",
        "jsy_cy": "1",
        "jsy_dh": "1",
        "jsy_zz": "1",
        "aj_fk": 300,
        "aj_pjh": "1",
        "aj_tcdd": "1",
        "aj_zfx": "1",
        "aj_zfxz": "1",
        "aj_zfj": "1",
        "aj_zfjz": "1",
        "aj_afsj": "2015-05-23 00:00",
        "aj_afdd": "1",
        "fj_cz": 0,
        "fj_zz": 22,
        "fj_sj": "2015-05-23 00:00",
        "fj_dh": "1",
        "aj_xwbldd": "1",
        "aj_xwblsj": "1899-12-30 01:00",
        "aj_xcbldd": "1",
        "dw": null,
        "aj_xcblsj": "2015-05-23 00:00"
      }
      item.aj_id = $scope.item.aj_id;

      $scope.item = item;

    }


  })
