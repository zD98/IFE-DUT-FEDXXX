(function(window) {
  
  'use strict';
  function ZdAlbum(config) {
    this.LAYOUT = {
      PUZZLE: 1,    // 拼图布局
      WATERFALL: 2, // 瀑布布局
      BARREL: 3     // 木桶布局
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
    let index = 0;
    
    while(images.length){
      let lineNum = Math.floor(Math.random()*6+1);  
      let imgs = images.splice(index,lineNum);
      let rw = radio(imgs);
    
      
      let lineHeight = this.width/rw;

      //TODO
      index+=lineNum;
      function radio(imgs){
        let img = imgs.shift();
        if(imgs.length==0){
          return img.radio;
        }else{
          return img.radio+arguments.callee(imgs);
        }
      }
    }
  };
  ZdAlbum.prototype.addImage = function (image, config) {
        
  };

  ZdAlbum.prototype.setLineImages = function(images){

  }

  //默认是cover 若用户输入了设置就按照用户设置的比例
  function setImageSize(){

  }
})(window);


function radio(imgs){
  let img = imgs.shift();
  if(imgs.length==0){
    return img.radio;
  }else{
    return img.radio+arguments.callee(imgs);
  }
}