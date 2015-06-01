angular.module("slider", []).service('sliderService', function ($rootScope, $document) {
  var _requestMethod, _postData;
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
  this.stopAutoHide = function () {
    $document.unbind("mousedown")
  }
  // 默认启动自动隐藏
  this.startAutoHide();
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







