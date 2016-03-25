/**
 * Created by zd98 on 2016/3/22.
 */
var hero = function(){


  //0:up  1:right 2:down 3:left
  var direct = 0;
  var actions = [];
  var element = null;
  var matrix = [1,0,0,1,0,0];
  var state = {
    go:go,
    tun:tun,
    tra:tra,
    mov:mov,
    moveTo:moveTo
  };
  
  return {
    init:init,
    receiveActions:receive
  };
  
  function moveTo(x,y){
    x--;y--;
    var path = Map.getInstance().search(Math.floor(matrix[4]/50),Math.floor(matrix[5]/50),x,y);
    runInPath(path);
  }
  function runInPath(path){
    var ox,oy,cx,cy,
      horizon = false,vertical = false;
    if(path.length==0){
      return;
    }
    ox= cx = path[0].x; oy= cy = path[0].y;
    for(var i = 1,len = path.length;i<len;i++) {

      var p = path[i];
      var d;
      if (p.y == cy) {
        if (vertical == false) {
          horizon = true;
        } else {
          //转向
          d = cy - oy > 0 ? 2 : 0;
          turn(d);
          move(d, Math.abs(cy - oy));
          oy = cy;
          vertical = false;
          horizon = true;
        }
      }
      if (p.x == cx) {
        if (horizon == false) {
          vertical = true;
        } else {
          //转向
          d = cx- ox > 0 ? 1 : 3;
          turn(d);
          move(d, Math.abs(cx - ox));
          ox = cx;

          horizon = false;
          vertical = true;
        }

      }
      cx = p.x;
      cy = p.y;
    }
    if(horizon){
      d = cx- ox > 0 ? 1 : 3;
      turn(d);
      move(d, Math.abs(cx - ox));
    }
    if(vertical){
      d = cy - oy > 0 ? 2 : 0;
      turn(d);
      move(d, Math.abs(cy - oy));
    }
    if(actions.length!=0) {
      element.style.transform = actions.shift();
      element.getComputedStyle();
    }
  }
  function init(ele){
    element = ele;
    element.addEventListener('transitionend',function(){
     var action;
      if(actions.length!=0){
       action = actions.shift();
       element.style.transform = action;
     }
    })
  }
  function receive(cmds){
    for(var i=0,len = cmds.length;i<len;i++){
      state[cmds[i][0]].apply(null,cmds[i].slice(1));
    }

    if(actions.length!=0) {
      element.style.transform = actions.shift();
    }
  }
  function go(steps){
    move(direct,steps);
  }
  function tun(dir){
    switch (dir) {
      case "LEF":
        direct = --direct>-1?direct:direct+=4;
        break;
      case "RIG":
        direct = ++direct<4?direct:direct-=4;
        break;
      case "BAC":
        direct = (direct+=2)<4?direct:direct-=4;
        break;
    }
    turn(direct)
  }
  function tra(dir,steps){
    switch (dir){
      case "LEF":
        dir = 3;
        break;
      case "RIG":
        dir = 1;
        break;
      case "TOP":
        dir = 0;
        break;
      case "BOT":
        dir = 2;
        break;
    }
    move(dir,steps)
  }
  function mov(dir,steps){
    switch (dir){
      case "LEF":
        direct = 3;
        break;
      case "RIG":
        direct = 1;
        break;
      case "TOP":
        direct = 0;
        break;
      case "BOT":
        direct = 2;
    }
    turn(direct);
    go(steps);
  }
  function move(direction, steps){
    var len  = steps*50;
    switch (direction){
      case 0:
        matrix[5]-=len;
        matrix[5]<0?matrix[5]=0:matrix[5];
        break;
      case 1:
        matrix[4]+=len;
        matrix[4]>450?matrix[4]=450:matrix[4];
        break;
      case 2:
        matrix[5]+=len;
        matrix[5]>450?matrix[5]=450:matrix[5];
        break;
      case 3:
        matrix[4]-=len;
        matrix[4]<0?matrix[4]=0:matrix[4];
        break
    }
    
    var css = 'matrix('+matrix.join(',')+')';
    actions.push(css);
  }
  function turn(direction){
    switch (direction){
      case 0:
        matrix[0]= 1;
        matrix[1]= 0;
        matrix[2]= 0;
        matrix[3]= 1;
        break;
      case 1:
        matrix[0]= 0;
        matrix[1]= 1;
        matrix[2]= -1;
        matrix[3]= 0;
        break;
      case 2:
        matrix[0]= -1;
        matrix[1]= 0;
        matrix[2]= 0;
        matrix[3]= -1;
        break;
      case 3:
        matrix[0]= 0;
        matrix[1]= -1;
        matrix[2]= 1;
        matrix[3]= 0;
        break;
      default:

    }
    var css = 'matrix('+matrix.join(',')+')';
    actions.push(css);
  }

}();