'use strict';

(function (window) {
  'use strict';

  function ZdAlbum(config) {
    config = config || {};
    this.LAYOUT = {
      PUZZLE: 1, // 拼图布局
      WATERFALL: 2, // 瀑布布局
      BARREL: 3 // 木桶布局
    };
    this.el = null;
    this.width = config.width || 1000;
    this.children = null;
    this.NUM = 0;
    this.boot();
  }

  ZdAlbum.prototype.boot = function () {
    this.layout = this.LAYOUT.BARREL;
    //如果传入了ele 就用传入的ele 当容器
    this.el = document.createElement('div');
    this.el.classList.add('barrel');
    this.el.style.width = this.width + 'px';
    this.children = [];
  };
  ZdAlbum.prototype.setImages = function (images, options) {
    //1.获得container width
    //2.random 一个整数 
    //3.读取整数个图片
    //4.按比例计算出行高(对行高有个判断 如若行太高或太低就增减相应的图片数 &&图片数不够的话 占位一行 此时通过minHeight计算)
    //5.生成每个元素
    //6.appendChild

    while (images.length) {
      //TODO:
      //1.改进选取图片个数的算法
      //2.当最后一行个数不够时 可以不填满整行
      var lineNum = Math.floor(Math.random() * 6 + 1);
      var imgs = images.splice(0, lineNum);
      var rw = getRatio(imgs, 0);
      var lineHeight = this.width / rw;
      this.setLineImages(imgs, lineHeight);
    }
    function getRatio(imgs, tag) {
      //0 IS A BUG;
      var len = imgs.length;
      var rw = 0;
      while (--len != -1) {
        rw += imgs[len].ratio;
      }
      return rw;
    }
    document.body.appendChild(this.el);
  };
  ZdAlbum.prototype.addImage = function (image, lineHeight) {
    //image.radio lineHeight
    var w = lineHeight * image.ratio,
        h = lineHeight;
    var el = document.createElement('div');
    el.classList.add('barrel-item');
    el.style.width = w + 'px';
    el.style.height = h + 'px';
    var img = document.createElement('div');
    img.classList.add('img-container');
    img.style.backgroundImage = 'url(' + image.url + ')';
    el.appendChild(img);
    this.el.appendChild(el);
  };

  ZdAlbum.prototype.setLineImages = function (images, lineHeight) {
    images.forEach(function (img) {
      this.addImage(img, lineHeight);
    }.bind(this));
  };
  window.ZdAlbum = ZdAlbum;
  //默认是cover 若用户输入了设置就按照用户设置的比例
  function setImageSize() {}
})(window);

var images = [{
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
images.forEach(function (img) {
  img.ratio = img.width / img.height;
});
var album = new ZdAlbum();
album.setImages(images);