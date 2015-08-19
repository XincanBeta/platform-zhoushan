angular.module('app.desktop', []).controller('DesktopCtrl', function ($scope, $http, $state) {



    $scope.chartCarConfig = {
      options: {
        colors: ['#F6BD0F', '#AFD8F8', '#8BBA00', '#FF8E46', '#008E8E'],
        chart: {
          width: 290,
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
        tickPositions: [0, 20, 40, 60, 80,100],
        title: {
          text: '单位（辆）'
        }
      },
      tooltip: {
        enabled: false,
        formatter: function () {


          return '<b>' + this.series.name + '</b><br/>' + this.x  + ': ' + this.y;
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
        data: [ 10, 20, 10, 15, 10, 65] //
      },{
        name: 'AAAAAAA',
        data: [ 15, 25, 30, 5, 30, 65] //
      }]
    }

    $scope.chartMoneyConfig = {
      options: {
        colors: ['#F6BD0F', '#AFD8F8', '#8BBA00', '#FF8E46', '#008E8E'],
        chart: {
          width: 290,
          height: 300,
          type: 'line'
        }
      },
      credits: {
        enabled: false
      },
      title: {
        text: '违法超限金额趋势分析'
      },
      subtitle: {
        text: ''
      },
      xAxis: {

        categories: ['一月', '二月', '三月', '四月', '五月', '合计']
      },
      yAxis: {
        tickPositions: [1000, 2000, 4000, 6000, 8000,10000],
        title: {
          text: '单位（元）'
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
        data: [ 1500, 2000, 2200, 1600, 1000, 8300]
      }]
    }






    








  });
