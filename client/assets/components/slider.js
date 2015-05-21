angular.module("slider", []).factory('sliderService', function ($rootScope, $document, util) {
  // 下划线开头的为方法内部使用
  var _requestMethod, _postData;
  var show = function () {
    _requestMethod(_postData).success(function (data) {
      $rootScope.$emit("entity.update", data)
      $rootScope.$emit("slider.show")
    })
  }
  var hide = function () {
    $rootScope.$emit("slider.hide")
  }
  var showAfterHide = function () {
    $rootScope.$emit("slider.showAfterHide")
  }
  // slider 只管调用，不管具体请求类型
  var initRequestMethod = function (requestMethod) {
    _requestMethod = requestMethod;
  }
  // slider 只管设置参数，不管是设置给哪个请求方法
  var setRequestData = function (postData) {
    _postData = postData;
  }
  var startAutoHide = function () {
    $document.mousedown(function (event) {
      var $target = $(event.target);
      if (!($target.parents("[my-slider-show]").length > 0
        || $target.parents("tr").length > 0
        || $target.parents("ul").length > 0
        || $target.parents("ol").length > 0 )) {
        hide()
        // 做接口，供调用者实现
        $rootScope.$emit("row.clearSelected")
      }
    })
  }
  var stopAutoHide = function () {
    $document.unbind("mousedown")
  }
  startAutoHide(); // 默认启动自动隐藏
  return {
    show: show,
    hide: hide,
    showAfterHide: showAfterHide,
    initRequestMethod: initRequestMethod,
    setRequestData: setRequestData,
    startAutoHide: startAutoHide,
    stopAutoHide: stopAutoHide
  }
})
  .directive("mySliderShow", function ($rootScope, $document, sliderService) {
    return {
      restrict: "A",
      "link": function (scope, element, attrs) {
        var show = function () {
            //console.log("slider show");
            element.animate({"width": sliderWidth}, "fast");
          },
          hide = function () {
            //console.log("slider hide");
            element.animate({"width": "0"}, "fast");
          },
          showAfterHide = function () {
            //console.log("slider show after hide");
            hide();
            sliderService.show()
          },
        // 1024 * 0.6 = 614 < 650
          sliderWidth = attrs.sliderWidth || "650px";
        $rootScope.$on("slider.show", show)
        $rootScope.$on("slider.hide", hide)
        $rootScope.$on("slider.showAfterHide", showAfterHide)
      }
    }
  })







