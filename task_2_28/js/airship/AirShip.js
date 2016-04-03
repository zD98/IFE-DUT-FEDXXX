/**
 * Created by zd98 on 2016/3/28.
 */
/**
 * 
 * @constructor
 */
function Airship (id,track){
  
  this.$state = "stop";
  this.$uuid = id;
  this.$dynamicSystem = null;
  this.$energySystem = null;
  this.$emitter = new Emitter("airship");
  this.$receiver = new Receiver("planet");
  this.$internal = null;
  this.$ship = null;
  this.$track = track;
  this.init();
}
Airship.prototype = {
  constructor:Airship,
  init:function(){
    console.log("create Airship");
    this.$receiver.receiveMsg = function(msg){
      var obj = Adapter.ship.convertByteToObj(msg);
      console.log(obj);
      if(obj.id == this.$uuid){
        this.execute(obj.command);
      }
    }.bind(this);
    this.$ship = new Ship(0.7,32,32);
    gl.addObject(this.$ship);
    let count = 0;
    //TODO render and interval and v
    // setInterval(function(){
    //
    //   if(this.$state == "run"){
    //     count++;
    //   }
    //   this.render(count);
    // }.bind(this),20);

    this.$internal = setInterval(function(){
      this.$energySystem.charge();
      if(this.$energySystem.getEnergy()<this.$dynamicSystem.consumption){
        this.$state = 'stop';
        this.stop();
      }
      if(this.$state == 'run') {
        this.$dynamicSystem.consumpt();
        count++;
      }
      var msg = {
        id:this.$uuid,
        dynamic:this.$dynamicSystem.getName(),
        energy:this.$energySystem.getName(),
        state:this.$state,
        left:this.$energySystem.getEnergy()
      };
      msg = Adapter.ship.convertObjToByte(msg);
      this.$emitter.sendMsg(msg);
    }.bind(this),1000);


  },
  //绘图用render
  render:function(count){
    let a = Math.PI*2/360*count;
    let x = Math.cos(a)*5*this.$track;
    let y = Math.sin(a)*5*this.$track;
    let z = 0;
    this.$ship.identify();
    this.$ship.rotate(-Math.PI/2,[1,0,0]);
    this.$ship.rotate(a,[0,1,0]);
    this.$ship.translate([-x,z,-y]);
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
      dynamic:this.$dynamicSystem.getName(),
      energy:this.$energySystem.getName(),
      state:this.$state,
      left:this.$energySystem.getEnergy()
    };
    msg = Adapter.ship.convertObjToByte(msg);
    this.$emitter.sendMsg(msg);
    
    this.$energySystem.destroy();
    this.$dynamicSystem.destroy();
    this.$emitter.destroy();
    this.$receiver.destroy();
    
    AirShipFactory.destroyById(this.$uuid);
    //视图上的销毁
    gl.removeObject(this.$ship);
  }
};



