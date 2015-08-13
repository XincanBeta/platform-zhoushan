/* 
 1）平滑移进
 2）等数据加载完毕
 3）平滑移出
 */

angular.module("slider", []).service('sliderService', function ($rootScope, $document) {
  var _requestMethod, _postData, _this = this;
  this.show = function () {
    _requestMethod(_postData).success(function (data) {
      $rootScope.$emit("entity.update", data)
      $rootScope.$emit("slider.show")
    })
  }
  this.hide = function () {
    $rootScope.$emit("slider.hide")
  }
  this.showAfterHide = function () {
    $rootScope.$emit("slider.showAfterHide")
  }
  // slider 只管调用，不管具体请求类型
  this.initRequestMethod = function (requestMethod) {
    _requestMethod = requestMethod;
  }
  // slider 只管设置参数，不管是设置给哪个请求方法
  this.setRequestData = function (postData) {
    _postData = postData;
  }
  this.startAutoHide = function () {
    $document.bind('mousedown.slider', function (event) {
      var $target = $(event.target);
      if (!($target.parents("[my-slider-show]").length > 0
        || $target.parents("tr").length > 0
        || $target.parents("ul").length > 0
        || $target.parents("ol").length > 0 )) {
        _this.hide()
        // 做接口，供调用者实现
        $rootScope.$emit("row.clearSelected")
      }
    })
  }
  this.stopAutoHide = function () {
    $document.unbind("mousedown")
  }
  // 默认启动自动隐藏
  this.startAutoHide();
})
  .directive("mySliderShow", function ($rootScope, $document, sliderService, $timeout) {
    return {
      restrict: "A",
      "link": function (scope, element, attrs) {
        // 1024 * 0.6 = 614 < 650
        var sliderWidth = attrs.sliderWidth || "650px"; // 用固定值，与侧边栏图片宽度有关
        var show = function () {
          // 暴露接口：滑动隐藏完成供 detail 重置为第一个选项卡
          $rootScope.$emit("slider.hide.done")
          // 等动画执行完毕，增加平滑效果
          $timeout(function () {
            element.animate({"width": sliderWidth}, "fast");
          }, 300)
        }
        var hide = function () {
          element.animate({"width": "0"}, "fast");
        }
        var showAfterHide = function () {
          hide();
          sliderService.show()
        }
        $rootScope.$on("slider.show", show)
        $rootScope.$on("slider.hide", hide)
        $rootScope.$on("slider.showAfterHide", showAfterHide)
      }
    }
  })







