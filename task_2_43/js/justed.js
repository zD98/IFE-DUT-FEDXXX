(function(window){
  'use strict';
  function ZdAlbum(config){
    this.LAYOUT = {
      PUZZLE: 1,    // 拼图布局
      WATERFALL: 2, // 瀑布布局
      BARREL: 3     // 木桶布局
    };
    this.el = null;
    
    this.boot();
  }
  
  ZdAlbum.prototype.boot = function(){
    this.layout = this.LAYOUT.PUZZLE;
    //如果传入了ele 就用传入的ele 当容器
    this.el = document.createElement('div');
    this.el.classList.add('puzzle');
  };
  ZdAlbum.prototype.setImage = function (images,options){ 
    
    let num = images.length>6?6:images.length;
    let frag = document.createDocumentFragment();
    
    for(let i =0;i<num;i++){
      let container = document.createElement('div');
      container.classList.add('img-container');
      container.classList.add('puzzle-'+(i+1));
      container.style.backgroundImage = `url(${images[i]})`;
      frag.appendChild(container);
    }
    this.el.appendChild(frag);
    this.el.classList.add('puzzleO'+num);
  };
  ZdAlbum.prototype.addImage = function (image,config){

  };
  if(!window.ZdAlbum) {
    window.ZdAlbum = ZdAlbum;
  }

  var puzzle = function(){
    return {
      createPuzzleO1:function(){

      },
      createPuzzleO2:function(){

      },
      createPuzzleO3:function(){

      },
      createPuzzleO4:function(){

      },
      createPuzzleO5:function(){

      },
      createPuzzleO6:function(){

      }
    }
  }();


})(window);

var urls = ['image/1.jpg','image/2.jpg','image/3.jpg','image/4.jpg','image/5.jpg'];

var album = new ZdAlbum();
album.setImage(urls);
document.body.appendChild(album.el);