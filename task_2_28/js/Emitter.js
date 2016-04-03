/**
 * Created by zd98 on 2016/3/28.
 */
/**
 * 
 * @param type emitter是Emitter的发送者
 * @constructor
 */
function Emitter(type){
  this.type = type;
}

Emitter.prototype = {
  constructor:Emitter,
  sendMsg:function(msg){
  BUS.publish(this.type,msg);
},
  destroy:function(){
    
  }
};


