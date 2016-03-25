/**
 * Created by zd98 on 2016/3/25.
 */
// Model Map
var Map = (function(){
  var instance ;
  function init(){
    var pointsArray = [];
    var width,height = 0;
    return {
      initMap:initMap,
      addHinder:addHinder,
      search : search
    };
    function addHinder(x, y){
      getPoint(x,y).isHinder = true;
    }
    function getPoint(x , y){
      return pointsArray[x+y*width];
    }
    function search(sX,sY,eX,eY,way){
      
      refresh();
      //TODO  eX,eY出界判断,目前只提供A*算法
      var start = getPoint(sX,sY),end = getPoint(eX,eY);
      astart.setMap(pointsArray,width,height);
      return astart.findPath(start, end ,false);
    }
    function refresh(){
      for(var i=0,len = width*height;i<len;i++){
        var  p = pointsArray[i];
        p.isClosed = false;
        p.G = 0;
        p.H = 0;
        p.F = 0;
        p.prePoint = null;
      }
    }
    function initMap(w,h){
      width = w;
      height = h;
      var point ;
      for(var i =0,len = w*h;i<len;i++){
        point = new Point(i%width,Math.floor(i/width));
        pointsArray.push(point);
      }
    }
  }
  
  
  return {
    getInstance:function(){
      if(!instance){
        instance = init();
      }
      return instance;
    }
  }
})();