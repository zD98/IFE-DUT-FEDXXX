/**
 * Created by zd98 on 2016/3/28.
 */
/**
 * 
 * @constructor
 */
function Airship (id){
  
  this.$state = "";
  this.$uuid = id;
  this.$dynamicSystem = null;
  this.$energySystem = null;
  this.$emitter = new Emitter("airship");
  this.$receiver = new Receiver("planet");
  this.$internal = null;
  console.log(this.$receiver);
  this.init();
}
Airship.prototype = {
  constructor:Airship,
  init:function(){
    console.log("create Airship");
    this.$receiver.receiveMsg = function(msg){
      var obj = Adapter.convertBytetoObj(msg);
      if(obj.id == this.$uuid){
        this.execute(obj.command);
      }
    }.bind(this);

    this.$internal = function(){
        var msg = {};
        msg = Adapter.convertObjtoByte(msg);
        this.$emitter.sendMsg(msg)
    }.bind(this);
    
    setInterval(this.$internal,1000);
  },
  //绘图用render
  render:function(){

  },
  execute:function(command){
    switch (command){
      case "run":
        this.run();
        break;
      case "stop":
        this.stop();
        break;
      case "destroy":
        this.destroy();
        break;
    }
  },
  //飞行
  run:function(){
    this.$energySystem.charge();
    if(this.state == "fly"){
      this.$dynamicSystem.consumpt();
    }
  },
  stop:function(){

  },
  //销毁
  destroy:function(){
    this.$energySystem.destroy();
    this.$dynamicSystem.destroy();
    this.$emitter.destroy();
    this.$receiver.destroy();
    AirShipFactory.destroyById(this.$uuid);
    //视图上的销毁
  }
};



