/**
 * Created by zd98 on 2016/3/28.
 */
function Planet(){
  
  this.$dc = new DataCenter();
  this.$emitter = new Emitter('planet');
  this.$receiver = new Receiver('airship');

}

Planet.prototype = {
  constructor:Planet,
  init:function(){
    this.$receiver.receiveMsg = function(msg){
      
    }.bind(this);
  },
  sendCmd:function(id, command){
    var obj = {};
    obj.id = id;
    obj.command = command;
    var msg = Adapter.convertObjtoByte(obj);
    this.$emitter.sendMsg(msg);
  }
  ,
  createShip:function(dynamicSystem, energySystem){
    AirShipFactory.createAirShip(dynamicSystem, energySystem);
  }


};


