'use strict';

(function (window) {
  'use strict';

  function ZdAlbum(config) {
    this.LAYOUT = {
      PUZZLE: 1, // 拼图布局
      WATERFALL: 2, // 瀑布布局
      BARREL: 3 // 木桶布局
    };
    this.el = null;
    this.width = config.width || 500;
    this.height = config.height || 300;
    this.children = null;
    this.special = [];
    this.NUM = 0;
    this.boot();
  }

  ZdAlbum.prototype.boot = function () {
    this.layout = this.LAYOUT.PUZZLE;
    //如果传入了ele 就用传入的ele 当容器
    this.el = document.createElement('div');
    this.el.classList.add('puzzle');
    this.el.style.width = this.width + 'px';
    this.el.style.height = this.height + 'px';

    this.children = [];
  };
  ZdAlbum.prototype.setImage = function (images, options) {

    var num = this.NUM = images.length > 6 ? 6 : images.length;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < num; i++) {
      addImage.call(this, frag, images[i], i);
    }
    this.specialize();
    this.el.appendChild(frag);
    this.el.classList.add('puzzleO' + num);
  };
  ZdAlbum.prototype.addImage = function (image, config) {
    var layout = this.layout;
    //只有puzzle
    if (this.NUM > 6) {
      throw 'the num > 6';
      return false;
    }
    this.el.classList.remove('puzzleO' + this.NUM);
    this.NUM++;
    this.el.classList.add('puzzleO' + this.NUM);
    this.unspecialize();
    addImage.call(this, this.el, image, this.NUM - 1);
    this.specialize();
    return true;
  };

  ZdAlbum.prototype.specialize = function () {
    var num = this.NUM;
    for (var i = 0; i < num; i++) {
      _specialize.call(this, this.children[i], num, i);
    }
  };
  ZdAlbum.prototype.unspecialize = function () {
    while (this.special.length != 0) {
      var s = this.special.pop();
      for (var i = 0, len = s.props.length; i < len; i++) {
        this.children[s.inx].style[s.props[i]] = '';
      }
    }
  };
  if (!window.ZdAlbum) {
    window.ZdAlbum = ZdAlbum;
  }
  //add Image or modify the background
  function addImage(frag, url, inx) {
    var container = document.createElement('div');
    setImageClass.call(container, inx);
    setImageUrl.call(container, url);
    this.children.push(container);
    frag.appendChild(container);
  }
  function setImageClass(i) {
    this.classList.add('img-container');
    this.classList.add('puzzle-' + (i + 1));
  }
  function setImageUrl(url) {
    this.style.backgroundImage = 'url(' + url + ')';
  }

  function _specialize(el, container, inx) {

    if (container != 3 && container != 5) {
      return;
    }
    if (container == 3) {
      if (inx == 0) {
        el.style.width = this.width - this.height / 2 + 'px';
        this.special.push({ inx: inx, props: ['width'] });
      } else {
        var x = this.width - this.height / 2 + 'px';
        var y = inx == 1 ? 0 : '100%';
        el.style.width = this.height / 2 + 'px';
        el.style.transform = 'translate(' + x + ',' + y + ')';
        this.special.push({ inx: inx, props: ['width', 'transform'] });
      }
      return;
    }
    if (container == 5) {
      if (inx == 1) {
        el.style.height = this.width / 3 + 'px';
        this.special.push({ inx: inx, props: ['height'] });
      }
      if (inx == 4) {
        var _y = this.width / 3 + 'px';
        el.style.height = this.height - this.width / 3 + 'px';
        el.style.transform = 'translate(200%,' + _y + ')';
        this.special.push({ inx: inx, props: ['height', 'transform'] });
      }
    }
  }
  //默认是cover 若用户输入了设置就按照用户设置的比例
  function setImageSize() {}
})(window);

var urls = ['image/1.jpg', 'image/2.jpg'];

var album = new ZdAlbum({ width: 1000, height: 800 });
album.setImage(urls);
document.body.appendChild(album.el);

setTimeout(function () {
  album.addImage('image/6.jpg');
}, 1000);