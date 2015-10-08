/**
 * 主控制器，并声明模块
 */
//'ui.bootstrap', 'brantwills.paging'
angular.module('app.sas', [])
  .controller('SasCtrl', function ($scope, requestService, $state, $timeout) {

      $scope.menus = [
        {
          menuname: "道路交通流量统计",
          routestate: "myapp.sas.main"
        },
        {
          menuname: "监测点交通流量统计",
          routestate: "myapp.sas.jtlldcz"
        },
        {
          menuname: "数据采集信息统计",
          routestate: "myapp.sas.sjcj"
        },
        {
          menuname: "监测点交通流量统计表",
          routestate: "myapp.sas.dczList"
        },
        {
          menuname: "节假日交通流量统计与预测",
          routestate: "myapp.sas.holiday"
        }
      ];
      $scope.select($scope.menus[0])


      $scope.select = function (menu) {
        $scope.selected = menu
        $state.go(menu.routestate);
      }

      $scope.isSelected = function (menu) {
        return $scope.selected == menu ? "is-select" : "";
      }


      $scope.backToMyapp = function () {
        $("#platform-body").removeClass("is-expand");
        $timeout(function () {
          $state.go("myapp")
        }, 300)
      }

    });
