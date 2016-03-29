/**
 * Created by zd98 on 2016/3/28.
 */
function Planet(){
  
  this.$dc = new DataCenter();
  this.$emitter = new Emitter('planet');
  this.$receiver = new Receiver('airship');

  this.init();
}

Planet.prototype = {
  constructor:Planet,
  init:function(){
    this.$receiver.receiveMsg = function(msg){
      console.log("planet receiver");
      console.log(msg);
      var obj = Adapter.convertBytetoObj(msg);
      console.log(obj);
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


