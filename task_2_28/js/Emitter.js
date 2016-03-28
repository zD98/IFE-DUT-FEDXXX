/**
 * Created by zd98 on 2016/3/28.
 */
function Emitter(type){
  this.type = type;
}

Emitter.prototype = {
  constructor:Emitter,
  sendMsg:sendMsg
};

function sendMsg(msg){
  BUS.publish(this.type,msg);
  
}