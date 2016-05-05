'use strict';

/**
 * Created by zd98 on 2016/4/25.
 */
(function (window) {
  'use strict';

  function ZdAlbum(config) {
    this.LAYOUT = {
      PUZZLE: 1, // 拼图布局
      WATERFALL: 2, // 瀑布布局
      BARREL: 3 // 木桶布局
    };

    this.el = null;
    // the container's columns
    //{el:el,curHeight:Num}
    this.columns = [];
    this.images = [];
    this.boot();
  }

  ZdAlbum.prototype.boot = function () {
    if (this.el == null) {
      this.el = document.createElement('div');
      this.el.classList.add('container');
    }
    document.body.appendChild(this.el);
    this._generateColumn();
  };
  ZdAlbum.prototype._generateColumn = function () {

    var width = parseFloat(window.getComputedStyle(this.el).width);
    this.num = Math.floor(width / 220);
    var frag = document.createDocumentFragment();
    for (var i = 0; i < num; i++) {
      var column = document.createElement('div');
      column.classList.add('column');
      this.columns.push({ el: column, curHeight: 0 });
      frag.appendChild(column);
    }

    this.detect = document.createElement('div');
    this.detect.classList.add('detect');
    frag.appendChild(this.detect);
    this.el.appendChild(frag);
  };
  ZdAlbum.prototype.setImages = function (images, options) {
    this.images = images;
    var frags = [];
    var columns = this.columns;
    var num = this.columns.length;
    for (var i = 0; i < num; i++) {
      frags.push([]);
    }

    for (var _i = 0; _i < images.length; _i++) {
      var tag = minHeight();
      frags[tag].push(images[_i]);
      columns[tag].curHeight += images[_i].height;
    }

    for (var _i2 = 0; _i2 < num; _i2++) {
      this._addImages(this.columns[_i2], frags[_i2]);
    }
  };

  ZdAlbum.prototype.addImage = function (image, config) {
    var tag = this.minHeight();
    var item = generateImg(image);
    this.columns[tag].appendChild(item);
  };
  ZdAlbum.prototype._addImages = function (column, imgs) {

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < imgs.length; i++) {
      fragment.appendChild(generateImg(imgs[i]));
    }
    column.el.appendChild(fragment);
  };
  ZdAlbum.prototype.clearImages = function () {
    while (this.el.hasChildNodes()) //当div下还存在子节点时 循环继续
    {
      this.el.removeChild(this.el.firstChild);
    }
  };
  ZdAlbum.prototype.refresh = function () {
    //this.setImages(this.images);
  };
  ZdAlbum.prototype.resize = function () {
    this.detectLeft = 0;
    window.onresize = function () {

      var left = this.detect.offsetLeft;
      if (Math.abs(this.detectLeft - left) > 50) {
        console.log('resize');
        this.clearImages();
        this._generateColumn();
        this.setImages(this.images);
      }
    }.bind(this);

    return this;
  };
  ZdAlbum.prototype.minHeight = function () {
    var min = Number.MAX_VALUE;
    var tag = 0;
    for (var i = 0; i < this.num; i++) {
      if (this.columns[i].curHeight < min) {
        min = this.columns[i].curHeight;
        tag = i;
      }
    }
    return tag;
  };
  function generateImg(img) {
    var item = document.createElement('div');
    item.classList.add('column-item');
    var container = document.createElement('div');
    container.classList.add('img-container');
    var image = new Image();
    image.src = img.url;
    item.appendChild(container);
    container.appendChild(image);
    return item;
  }

  if (!window.ZdAlbum) {
    window.ZdAlbum = ZdAlbum;
  }

  //add Image or modify the background

  //默认是cover 若用户输入了设置就按照用户设置的比例
  function setImageSize() {}
})(window);

var images = [{
  "url": "http://cued.xunlei.com/demos/publ/img/P_000.jpg",
  "height": 288
}, {
  "url": "http://cued.xunlei.com/demos/publ/img/P_001.jpg",
  "height": 288
}, {
  "url": "http://cued.xunlei.com/demos/publ/img/P_002.jpg",
  "height": 288
}, {
  "url": "http://cued.xunlei.com/demos/publ/img/P_003.jpg",
  "height": 129
}, {
  "url": "http://cued.xunlei.com/demos/publ/img/P_004.jpg",
  "height": 284
}, {
  "url": "http://cued.xunlei.com/demos/publ/img/P_005.jpg",
  "height": 253
}, {
  "url": "http://cued.xunlei.com/demos/publ/img/P_006.jpg",
  "height": 245
}, {
  "url": "http://cued.xunlei.com/demos/publ/img/P_000.jpg",
  "height": 288
}, {
  "url": "http://cued.xunlei.com/demos/publ/img/P_001.jpg",
  "height": 288
}, {
  "url": "http://cued.xunlei.com/demos/publ/img/P_002.jpg",
  "height": 288
}, {
  "url": "http://cued.xunlei.com/demos/publ/img/P_003.jpg",
  "height": 129
}, {
  "url": "http://cued.xunlei.com/demos/publ/img/P_004.jpg",
  "height": 284
}, {
  "url": "http://cued.xunlei.com/demos/publ/img/P_005.jpg",
  "height": 253
}, {
  "url": "http://cued.xunlei.com/demos/publ/img/P_006.jpg",
  "height": 245
}, {
  "url": "http://cued.xunlei.com/demos/publ/img/P_000.jpg",
  "height": 288
}, {
  "url": "http://cued.xunlei.com/demos/publ/img/P_001.jpg",
  "height": 288
}, {
  "url": "http://cued.xunlei.com/demos/publ/img/P_002.jpg",
  "height": 288
}, {
  "url": "http://cued.xunlei.com/demos/publ/img/P_003.jpg",
  "height": 129
}, {
  "url": "http://cued.xunlei.com/demos/publ/img/P_004.jpg",
  "height": 284
}, {
  "url": "http://cued.xunlei.com/demos/publ/img/P_005.jpg",
  "height": 253
}, {
  "url": "http://cued.xunlei.com/demos/publ/img/P_006.jpg",
  "height": 245
}];
var album = new ZdAlbum().resize();
album.setImages(images);