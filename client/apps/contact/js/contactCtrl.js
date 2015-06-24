angular.module('app.contact', [
  "ngJsTree"
]).controller('ContactCtrl', function ($scope, requestService, $http, $state, $ocLazyLoad, userService) {
  /*
   树目录
   指向通讯录内容
   懒加载
   */

  var user = userService.getUser();
  //console.log('---', );


  /*--------------------------
   $ 树目录
   --------------------------*/
  requestService.contactDeptList().success(function (res) {
    $scope.treeData = res.data;
    $scope.treeConfig = {
      core: {
        strings: {'Loading ...': '玩命加载中！'},
        multiple: false,
        check_callback: true,
        themes: {
          name: false,
          url: false,
          dir: false,
          icons: true,
          variant: false,
          stripes: false,
          responsive: true,
          dots: true
        }
      },
      types: {"default": {icon: "icon icon_folder_blue"}},
      plugins: ["types", "wholerow"]
    }
  }) // 对树做基本配置，其他操作要放到树加载（ ready ）完毕之后

  $scope.readyCB = function () {
    if ($scope.treeData) {
      // 触发点击事件，并且附有了点击样式
      $scope.treeInstance.jstree('select_node', $scope.treeData[0].id)
    }
  }
  // 点击事件
  $scope.selectNodeCB = function (node, selected) {
    /*if(user.dw.dwid == selected.node.id){
      $state.go('contact.list');
    }else{
      $state.go('contact.list', {dwid: selected.node.id}, {reload: true});
    }*/
  }


  /*--------------------------
   $ 指向通讯录内容
   --------------------------*/
  $state.go('contact.list');


  /*--------------------------
   $ 懒加载
   --------------------------*/
  var apps = '../apps/contact/';
  $ocLazyLoad.load([
    apps + 'js/contactDetailCtrl.js',
    apps + 'js/contactEditCtrl.js'
  ])


});
