// todo：已废弃

/**
 * angular-bootstrap-lightbox 是对 bootstrapLightbox 的封装，使用时直接引入 angular-bootstrap-lightbox 即可
 * angular-bootstrap-lightbox 主要用于配置 LightboxProvider
 *
 * 1）因为 bootstrapLightbox 依赖于 ui.boostrap，若放在首页加载会导致延迟。所以用动态加载。
 * 2）又因为 主模块的 config （貌似？）不支持动态加载
 *
 * 综上，单独建立一个模块，用于配置 bootstrapLightbox，使用时直接引入 angular-bootstrap-lightbox
 *
 * LightboxProvider 一旦开始设置就有基本的属性是必须设置的：
 *  templateUrl 可通过工具 html to js
 *
 *
 * 注：可与 angular-loading-bar 结合
 */

'use strict';
angular.module('angular-bootstrap-lightbox', ['bootstrapLightbox'])
  .config(function (LightboxProvider) {
    LightboxProvider.templateUrl = 'lightbox-modal.html';

    LightboxProvider.calculateModalDimensions = function () {
      return {
        'width': 800,
        'height': 600
      }
    }
  }).run(['$templateCache', function($templateCache) {
    $templateCache.put('lightbox.html',
      "<div class=modal-body ng-swipe-left=Lightbox.nextImage() ng-swipe-right=Lightbox.prevImage()><div class=lightbox-nav><button class=close aria-hidden=true ng-click=$dismiss()>×</button><div class=btn-group><a class=\"btn btn-xs btn-default\" ng-click=Lightbox.prevImage()>‹ Previous</a> <a ng-href={{Lightbox.imageUrl}} target=_blank class=\"btn btn-xs btn-default\" title=\"Open in new tab\">Open image in new tab</a> <a class=\"btn btn-xs btn-default\" ng-click=Lightbox.nextImage()>Next ›</a></div></div><div class=lightbox-image-container><div class=lightbox-image-caption><span>{{Lightbox.imageCaption}}</span></div><img lightbox-src={{Lightbox.imageUrl}} alt=\"\"></div></div>"
    );

  }]);

