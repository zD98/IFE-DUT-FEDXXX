/**
 * Created by zd98 on 2016/3/22.
 */
var hero = function(){


  //0:up  1:right 2:down 3:left
  var direct = 0;
  var actions = [];
  var state = {
    go:go,
    tun:tun,
    tra:tra,
    mov:mov
  };
  return {
    receiveActions:receive
  };

  function receive(cmds){
    actions.concat(cmds);
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
        direct = direct+=2<4?direct:direct-=4;
        break;
    }
    turn(dir)
  }
  function tra(dir,steps){
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
    turn(dir);
    go(steps);
  }
  function move(direction, steps){
    switch (direction){
      case 0:
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break
    }
  }
  function turn(direction){
    switch (direction){
      case 0:
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      default:

    }
  }
}();