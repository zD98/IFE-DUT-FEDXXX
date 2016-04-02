/**
 * Created by zd98 on 2016/3/28.
 */
/**
 * 
 * @constructor
 */
function Airship (id){
  
  this.$state = "stop";
  this.$uuid = id;
  this.$dynamicSystem = null;
  this.$energySystem = null;
  this.$emitter = new Emitter("airship");
  this.$receiver = new Receiver("planet");
  this.$internal = null;
  this.init();
}
Airship.prototype = {
  constructor:Airship,
  init:function(){
    console.log("create Airship");
    this.$receiver.receiveMsg = function(msg){
      var obj = Adapter.convertBytetoObj(msg);
      console.log(obj);
      if(obj.id == this.$uuid){
        this.execute(obj.command);
      }
    }.bind(this);

    this.$internal = setInterval(function(){
      this.$energySystem.charge();
      if(this.$energySystem.getEnergy()<this.$dynamicSystem.consumption){
        this.$state = 'stop';
        this.stop();
      }
      if(this.$state == 'run') {
        this.$dynamicSystem.consumpt();
      }

      var msg = {
        id:this.$uuid,
        command:this.$state,
        energy:this.$energySystem.getEnergy()
      };
      msg = Adapter.convertObjtoByte(msg);
      this.$emitter.sendMsg(msg)
    }.bind(this),1000);
  },
  //绘图用render
  render:function(){

  },
  execute:function(command){
    console.log("airship "+command);
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
    if(this.$state == "stop"){
      this.$state = 'run';
    }
  },
  stop:function(){
    this.$state = "stop";
  },
  //销毁
  destroy:function(){
    clearInterval(this.$internal);
    this.$internal = null;
    this.$state = "destroy";
    var msg = {
      id:this.$uuid,
      command:this.$state,
      energy:this.$energySystem.getEnergy()
    };
    msg = Adapter.convertObjtoByte(msg);
    this.$emitter.sendMsg(msg);
    
    this.$energySystem.destroy();
    this.$dynamicSystem.destroy();
    this.$emitter.destroy();
    this.$receiver.destroy();
    
    AirShipFactory.destroyById(this.$uuid);
    //视图上的销毁
  }
};



