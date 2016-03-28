/**
 * Created by zd98 on 2016/3/28.
 */
function Receiver(type){
  this.uuid = new Date().getTime();
  this.target = type;
  this.init();
}

Receiver.prototype = {
  init:init,
  constructor: Receiver,
  receiveMsg: receiveMsg
};
function init(){
  BUS.register(this.target,this.uuid,this);
}
function receiveMsg(msg){
  
}