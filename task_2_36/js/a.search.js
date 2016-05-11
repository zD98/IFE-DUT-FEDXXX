/**
 * Created by zd98 on 2016/3/22.
 */
var astart = function(){

  var pointsArray = [],
    width = 0,height = 0;

  return {
    findPath:findPath,
    setMap:setMap
  };
  function setMap(points,w,h){
    pointsArray = points;
    width = w;
    height = h;
  }
  function findPath(start, end, isCorner){
    var openList = [],closeList= [];
    openList.push(start);
    start.setF(end);
    while(openList.length!=0){
      //find min F
      var tempStart = findMinF(openList);
      //找出临近点
      var aroundPoints = findAroundPoints(tempStart,isCorner);
      for(var i =0,len = aroundPoints.length;i<len;i++){
        var point = aroundPoints[i];
        if(openList.indexOf(point)!=-1&&isCorner){
          //计算G
          if(openList.indexOf(point)!=-1&&isCorner) {
            //计算G
            if ((tempStart.G + point.G) >= (tempStart.prePoint.G + tempStart.G)) {
              tempStart.isClosed = true;
              openList.splice(openList.indexOf(tempStart), 1);
              tempStart = point;
            }
          }
        }else{
          //计算GHF
          point.setH(end);
          point.setG(tempStart.G);
          point.setF();
          openList.push(point);
          point.prePoint = tempStart;
        }
      }
      openList.splice(openList.indexOf(tempStart),1);
      tempStart.isClosed = true;

      if(end.isClosed == true){
        var array = [], p = end;

        while(p!=null){
          array.push(p);
          p = p.prePoint;
        }
        return array.reverse();
      }
    }
    return [];
  }

  function findAroundPoints(start, isCorner){
    var x = start.x, y = start.y,point;
    var l = x-1,r = x+1,u = y-1,d = y+1;
    var result = [];
    if(l>-1){
      point = getPoint(l,y);
      point.G = 1;
      if((!point.isHinder)&&(!point.isClosed)){
        result.push(point);
      }
    }
    if(r<width){
      point = getPoint(r,y);
      point.G = 1;
      if((!point.isHinder&&!point.isClosed)){
        result.push(point);
      }
    }
    if(u>-1){
      point = getPoint(x,u);
      point.G = 1;
      if((!point.isHinder)&&(!point.isClosed)){
        result.push(point);
      }
    }
    if(d<height){
      point = getPoint(x,d);
      point.G = 1;
      if((!point.isHinder)&&(!point.isClosed)){
        result.push(point);
      }
    }
    if(!!isCorner){
      if(l>-1&&u>-1){
        console.log('left up');
        point = getPoint(l,u);
        point.G = 1.5;
        if(!point.isClosed&&!point.isHinder){
          result.push(point);
        }
      }
      if(r<width&&u>-1){
        console.log('right up');
        point = getPoint(r,u);
        point.G = 1.5;
        if(!point.isClosed&&!point.isHinder){
          result.push(point);
        }
      }
      if(d<height&&l>-1){
        console.log('left down');
        point = getPoint(l,d);
        point.G = 1.5;
        if(!point.isClosed&&!point.isHinder){
          result.push(point);
        }
      }
      if(d<height&&r<width){
        console.log('right down');
        point = getPoint(r,d);
        point.G = 1.5;
        if(!point.isClosed&&!point.isHinder){
          result.push(point);
        }
      }
    }
    return result;
    
    function getPoint(x,y){
      return pointsArray[y*width+x];
    }
  }
  function findMinF(list){
    var min = Number.MAX_VALUE,tag = 0;
    for(var i = 0, len = list.length;i<len;i++){
      if(list[i].F<min){
        min = list[i].F;
        tag = i;
      }
    }
    return list[tag];
  }
}();
