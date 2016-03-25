/**
 * Created by zd98 on 2016/3/25.
 */
var Wall = function(){

  var grids = document.querySelectorAll('.grid-map .grid');
  var width = 10,height =10;
  return {
    addWall:addWall,
    randomWall:randomWall,
    brushWall:brushWall
  };

  function addWall(x,y){
    
    grids[y*10+x].classList.add('wall');
    Map.getInstance().addHinder(x,y);
  }
  function randomWall(x,y){
    var i = Math.floor(Math.random()*5+1);
    console.log(i);

    for(var j =0;j<i;j++){
      var nx  = Math.floor(Math.random()*10);
      var ny = Math.floor(Math.random()*10);
      if(x!==nx&&y!==ny) {
        addWall(nx,ny);
      }
    }
  }

  function brushWall(x,y,color){
    var grid = grids[y*width+x];
    if(grid.classList.contains('wall')){
      grid.style.backgroundColor = color;
    }
  }
}();