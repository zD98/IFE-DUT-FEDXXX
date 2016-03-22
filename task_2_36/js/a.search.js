/**
 * Created by zd98 on 2016/3/22.
 */

function Point(x,y){
  this.x = x||0;
  this.y = y||0;
  this.G = 0;
  this.H = 0;
  this.F = 0;
  this.isHinder = false;
  this.isClosed = false;
  this.prePoint = null;
}
//简单的用距离计算H
Point.prototype.setH = function(end){
  this.H = Math.abs(end.x-this.x)+Math.abs(end.y-this.y);
};
Point.prototype.setG = function(g){
  this.G +=g ;
};
Point.prototype.setF = function(){
  this.F = this.G+this.H;
};

var pointArray = [];
for(var i =0 ;i<25;i++){
  var point = new Point(Math.floor(i/5),i%5);
  pointArray.push(point);
}

var astart = function(){

  var pointsArray = [];

  return {
    findPath:findPath,
    setMap:setMap
  };
  function setMap(points){
    pointsArray = points;
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
        if(openList.indexOf(point)!=-1){
          //计算G
          if(tempStart.G+point.G>tempStart.prePoint.G+tempStart.G){
            tempStart.isClosed = true;
            openList.splice(openList.indexOf(tempStart),1);
            tempStart = point;
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
      closeList.push(tempStart);
      if(end.isClosed == true){
        return closeList;
      }
    }
    return [];
  }

  function findAroundPoints(start, isCorner){
    var x = start.x, y = start.y,len = 5,point;
    var l = x-1,r = x+1,u = y-1,d = y+1;
    var result = [];
    if(l>-1){
      console.log('left');
      point = getPoint(l,y);
      point.G = 1;
      if(!point.isClosed&&!point.isHinder){
        result.push(point);
      }
    }
    if(r<len){
      console.log('right');
      point = getPoint(r,y);
      point.G = 1;
      if(!point.isClosed&&!point.isHinder){
        result.push(point);
      }
    }
    if(u>-1){
      console.log('up');
      point = getPoint(x,u);
      point.G = 1;
      if(!point.isClosed&&!point.isHinder){
        result.push(point);
      }
    }
    if(d<len){
      point = getPoint(x,d);
      point.G = 1;
      console.log('down');
      if(!point.isClosed&&!point.isHinder){
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
      if(r<len&&u>-1){
        console.log('right up');
        point = getPoint(r,u);
        point.G = 1.5;
        if(!point.isClosed&&!point.isHinder){
          result.push(point);
        }
      }
      if(d<len&&l>-1){
        console.log('left down');
        point = getPoint(l,d);
        point.G = 1.5;
        if(!point.isClosed&&!point.isHinder){
          result.push(point);
        }
      }
      if(d<len&&r<len){
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
      return pointsArray[x*5+y];
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

astart.setMap(pointArray);
console.log(astart.findPath(pointArray[0],pointArray[12]));