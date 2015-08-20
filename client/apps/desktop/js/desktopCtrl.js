angular.module('app.desktop', []).controller('DesktopCtrl', function ($scope, $http, requestService) {
  var showInit = function () {
    var myDate = new Date();
    var year = myDate.getFullYear();
    $scope.thisyear = year;
    $scope.lastyear = year-1;
    $scope.nextyear = year+1;
    $scope.showOverrun(year);
    $scope.thisyearActive = true;
  }
  $scope.showOverrun = function (select) {
    $scope.thisyearActive = false;
    requestService.overrunChart(select).success(function (data) {
      $scope.cl_count = data.data.cl_count;
      $scope.fk_count = data.data.fk_count;
      //$scope.y2x1 = data[year - 2014].y2x1;
      //$scope.y2x2 = data[year - 2014].y2x2;
      $scope.chartOverrunConfig = {
        options: {
          colors: ['#F6BD0F', '#AFD8F8', '#8BBA00', '#FF8E46', '#008E8E'],
          chart: {
            width: 450,
            height: 300,
            type: 'line'
          }
        },
        credits: {
          enabled: false
        },
        title: {
          text: select +'现场违法超限统计'
        },
        subtitle: {
          text: ''
        },
        xAxis: {

          categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        },
        yAxis: [{ //第一个Y轴，序号为0
          labels: {
            format: '{value}',
            style: {
              color: '#F6BD0F',
              color: '#8BBA00'
            }
          },
          tickPositions: [0, 20, 40, 60, 80, 100],
          title: {
            text: '车辆（辆）',
            style: {
              color: '#F6BD0F'
            }
          }
        }, { //第二个Y轴，序号为1
          title: {
            text: '金额（元）',
            style: {
              color: '#AFD8F8',
              color: '#FF8E46'
            }
          },
          tickPositions: [0, 2000, 4000, 6000, 8000, 10000],
          labels: {
            format: '{value}',
            style: {
              color: '#AFD8F8'
            }
          },
          opposite: true
        }],
        series: [{ //第一个Y轴的数据
          name: '车辆增长',
          color: '#F6BD0F',
          type: 'line',
          data: $scope.cl_count

        },
          /*{
            name: '车辆增长2',
            color: '#8BBA00',
            type: 'line',
            data: $scope.y1x2

          },*/
          { //第二个Y轴的数据
            name: '金额增长',
            yAxis: 1,//坐标轴序号
            color: '#AFD8F8',
            type: 'line',
            data:  $scope.fk_count

          },
          /*   {
           name: '金额增长2',
           yAxis: 1,//坐标轴序号
           color: '#FF8E46',
           type: 'line',
           data: $scope.y2x2

           }*/
        ],
        tooltip: {
          enabled: false,
          formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' + this.x + ': ' + this.y;
          }
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true
            },
            enableMouseTracking: false
          }
        }
      }
    })

  }
  showInit();


  /*  $scope.chartNonOverrunConfig = {
   options: {
   colors: ['#F6BD0F', '#AFD8F8', '#8BBA00', '#FF8E46', '#008E8E'],
   chart: {
   width: 600,
   height: 300,
   type: 'line'
   }
   },
   credits: {
   enabled: false
   },
   title: {
   text: '违法超限车辆趋势分析'
   },
   subtitle: {
   text: ''
   },
   xAxis: {

   categories: ['一月', '二月', '三月', '四月', '五月', '合计']
   },
   yAxis: {
   tickPositions: [0, 20, 40, 60, 80, 100],
   title: {
   text: '单位（辆）'
   }
   },
   tooltip: {
   enabled: false,
   formatter: function () {
   return '<b>' + this.series.name + '</b><br/>' + this.x + ': ' + this.y;
   }
   },
   plotOptions: {
   line: {
   dataLabels: {
   enabled: true
   },
   enableMouseTracking: false
   }
   },
   series: [{
   name: '增长数量',
   data: [10, 20, 10, 15, 10, 65]
   }]
   }*/


});
