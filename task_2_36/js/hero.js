/**
 * Created by zd98 on 2016/3/22.
 */
var hero = function(){

  var direction = "";
  //0:up  1:right 2:down 3:left
  var state = 0;

  var element = null;
  return {
    changeStates:changeStates
  };

  function changeStates(actions){

  }

  function changeState(action){

  }
  function move(direction, steps){
    switch (direction){
      case 'top':
        break;
      case 'left':
        break;
      case 'down':
        break;
      case 'right':
        break
    }
  }
  function turn(direction){
    switch (direction){
      case 'left':
        state = --state>0?state:state+=4;

        break;
      case 'right':
        state = ++state<4?state:state-=4;
        break;
      case 'back':
        state = state+=2<4?state:state-=4;
        break;
      default:
    }
  }
}();