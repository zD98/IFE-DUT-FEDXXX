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
    mov:mov
  };


  return {
    init:init,
    receiveActions:receive
  };
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
    console.log(actions);
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
        direct = --direct>0?direct:direct+=4;
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
    console.log(direct);
    var css = 'matrix('+matrix.join(',')+')';
    actions.push(css);
  }
}();