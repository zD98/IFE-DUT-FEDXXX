 import {} from './barrel.js';
 import {} from './puzzle.js';
 import {} from './waterfall.js';

 (function(window) {

     'use strict';
     const LAYOUTS = {
         PUZZLE: 1, // 拼图布局
         WATERFALL: 2, // 瀑布布局
         BARREL: 3 // 木桶布局
     };

     function ZdAlbum(config) {
         //container
         this.el = null;
         this.width = 0;
         this.height = 0;
         this.children = [];
         this.columns = [];
         this.num = 0;
         this.layout = -1;
         this._init(config);
     }
     let pt = ZdAlbum.prototype;
     pt._init = function(config) {
         let layout = (config.layout || 'WATERFALL').toLowerCase();
         this.layout = LAYOUTS[layout];
         this.width = config.width || 800;
         this.height = config.height || 600;
         //el init
         let el;
         if (typeof config.container !== 'string' || config.container === undefined) {
             el = document.querySelector(config.container);
         }
         if (el == null) {
             el = document.createElement('div')
         }
         el.classList.add('ZdAlbum');
         el.classList.add(layout);
         this.el = el;
         //width|height init
         this.el.style.width = this.width + 'px';
         this.el.style.height = this.height + 'px';

         this[layout].call(this);
     };

     pt.getElement = () => this.el;
     pt.setImages = function(images) {
         let frag = document.createDocumentFragment();
         //想法
         //1. 多功能相册, 做一个工作集
         //a. 关于拼图最多只有九张,所以拼图的地方考虑的是一个占位功能
         //b. 瀑布流布局和木桶布局可以用来放置大量图像的方式
         //拼图只是一个辅助功能的话
         //所以如果是一个工具集的话  你希望怎么处理这三个Layout
         //所以拼图的地方 提供两种功能
         //1. 生成占位
         //2. 可进行操作
         switch (this.layout) {
             case 0:
                 {

                     break;
                 }
             case 1:
                 {
                     //waterfall 
                     //columns 
                     break;
                 }
             case 2:
                 {
                     //targetHeight  minmax
                     break;
                 }
             default:

         }
         this.el.appendChild(frag);
     };
     pt.barrel = function() {
         this.top = 10;
         this.left = 10;
     }
     pt.waterfall = function() {}
     pt.puzzle = function() {}
     pt.addImage = function() {}
     pt.getImageElement = function() {}
     pt.removeImage = function() {

     }
     pt.setLayout = function() {}
     pt.getLayout = function() {}
     pt.setGutter = function() {}
     pt.enableFullscreen = function() {}
     pt.disableFullscreen = function() {}
     pt.isFullscreenEnabled = function() {}
     if (window.ZdAlbum == undefined) {
         window.ZdAlbum = ZdAlbum;
     }
 })(window);
 let images = [{
     "url": "http://cued.xunlei.com/demos/publ/img/P_000.jpg",
     "ratio": 0,
     "width": 192,
     "height": 288
 }, {
     "url": "http://cued.xunlei.com/demos/publ/img/P_001.jpg",
     "ratio": 0,
     "width": 192,
     "height": 288
 }, {
     "url": "http://cued.xunlei.com/demos/publ/img/P_002.jpg",
     "ratio": 0,
     "width": 192,
     "height": 288
 }, {
     "url": "http://cued.xunlei.com/demos/publ/img/P_003.jpg",
     "ratio": 0,
     "width": 192,
     "height": 129
 }, {
     "url": "http://cued.xunlei.com/demos/publ/img/P_004.jpg",
     "ratio": 0,
     "width": 192,
     "height": 284
 }, {
     "url": "http://cued.xunlei.com/demos/publ/img/P_005.jpg",
     "ratio": 0,
     "width": 192,
     "height": 253
 }, {
     "url": "http://cued.xunlei.com/demos/publ/img/P_006.jpg",
     "ratio": 0,
     "width": 192,
     "height": 245
 }, {
     "url": "http://cued.xunlei.com/demos/publ/img/P_007.jpg",
     "ratio": 0,
     "width": 192,
     "height": 343
 }, {
     "url": "http://cued.xunlei.com/demos/publ/img/P_008.jpg",
     "ratio": 0,
     "width": 192,
     "height": 238
 }];
 images.forEach(function(img) {
     img.ratio = img.width / img.height;
 });
 let album = new ZdAlbum();
 album.setImages(images)
