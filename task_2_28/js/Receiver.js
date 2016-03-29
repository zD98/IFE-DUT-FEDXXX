/**
 * Created by zd98 on 2016/3/28.
 */
/**
 * 
 * @param type receiver 是type的订阅者
 * @constructor
 */
function Receiver(type){
  this.uuid = new Date().getTime();
  this.target = type;
  this.init();
}

Receiver.prototype = {
  init:function(){
    BUS.register(this.target,this.uuid,this);
  },
  constructor: Receiver,
  receiveMsg: function(){
    console.log("undo msg");
  },
  destroy:
    function(){
      BUS.removeRegister(this.target,this.uuid);
    }
};


