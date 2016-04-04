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
    this.$renderIntenal = setInterval(function(){

      if(this.$state == "run"){
        count++;
      }
      this.render(count);
    }.bind(this),20);

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

    let n = 360/this.$dynamicSystem.getVelocity()*50;

    let a = Math.PI*2/n*count;
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
    clearInterval(this.$renderIntenal);
    this.$internal = null;
    this.$renderIntenal = null;
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




/**
 * Created by zd98 on 2016/3/28.
 */
var  AirShipFactory = function(){
  var types = {};
  var ids = ["1","2","3","4"];
  var idState = {
    "1":null,
    "2":null,
    "3":null,
    "4":null
  };
  return {
    registerSystem : register,
    createAirShip:create,
    destroyById:destroyById
  };

  function getId(){
    for(let i = 0;i<4;i++){
      if(idState[ids[i]]==null){
        return ids[i];
      }
    }
    return null;
  }

  function destroyById(id){
    idState[id] = null;
  }
  
  function register(type, System){
    types[type] = System;
  }
  
  function create(dynamicSystem, energySystem){
    var id = getId();
    if(id == null){
      throw "Ships are full"
    }
    var airship  = new Airship(id,parseInt(id));
    idState[id] = airship;
    airship.$dynamicSystem = new types[dynamicSystem](airship);
    airship.$energySystem = new types[energySystem](airship);
    return id;
  }
}();

/**
 * Created by zd98 on 2016/3/28.
 */
function DynamicSystem(ship){
  this.ship = ship||null;
  this.velocity = 20;
  this.consumption = 5;
}

DynamicSystem.prototype.consumpt = function(){
  this.ship.$energySystem.consumptEnergy(this.consumption);
};

DynamicSystem.prototype.getVelocity = function(){
  return this.velocity;
};
DynamicSystem.prototype.destroy = function(){

};

DynamicSystem.prototype.getName = function(){
  return this.name;
}
function AheadDSystem(ship){
  console.log("create AheadD");
  this.name = "AheadDSystem";
  this.ship = ship||null;
  this.velocity = 30;
  this.consumption = 5;
}
AheadDSystem.prototype = new DynamicSystem();

function GallopDSystem(ship){
  console.log("create GallopD");
  this.name = "GallopDSystem";
  this.ship = ship||null;
  this.velocity = 50;
  this.consumption = 7;
}
GallopDSystem.prototype = new DynamicSystem();

function TranscendDSystem(ship){
  console.log("create TranscendD");
  this.name = "TranscendDSystem";
  this.ship = ship||null;
  this.velocity = 80;
  this.consumption = 9;
}
TranscendDSystem.prototype = new DynamicSystem();

AirShipFactory.registerSystem('dynamicSystem',DynamicSystem);
AirShipFactory.registerSystem('AheadDSystem',AheadDSystem);
AirShipFactory.registerSystem('GallopDSystem',GallopDSystem);
AirShipFactory.registerSystem('TranscendDSystem',TranscendDSystem);
/**
 * Created by zd98 on 2016/3/28.
 */

function EnergySystem(ship){
  console.log();
  this.ship = ship||null;
  this.energy = 100;
  this.gain = 2;
}

EnergySystem.prototype = {
  constructor: EnergySystem,
  //每秒获取能源
  charge: function () {
    this.energy += this.gain;
    if (this.energy >= 100) {
      this.energy = 100;
    }
  }
  ,
  getEnergy:function(){
    return this.energy;
  },
  consumptEnergy:function(consumpt){
    this.energy -= consumpt;
  },
  getName:function(){
    return this.name;
  },
  destroy:destroy
};
function destroy(){
  
}
function EnergizerESystem(ship){
  console.log("create EnergizerE");
  this.name = "EnergizerESystem";
  this.ship = ship||null;
  this.energy = 100;
  this.gain = 2;
}

EnergizerESystem.prototype = new EnergySystem();

function LightESystem(ship){
  console.log("create LightE");
  this.name = "LightESystem";
  this.ship = ship||null;
  this.energy = 100;
  this.gain = 3;
}

LightESystem.prototype = new EnergySystem();
function PerpetualESystem(ship){
  console.log("create PerpetualE");
  this.name  = "PerpetualESystem";
  this.ship = ship||null;
  this.energy = 100;
  this.gain = 3;
}

PerpetualESystem.prototype = new EnergySystem();


AirShipFactory.registerSystem('EnergySystem',EnergySystem);
AirShipFactory.registerSystem('EnergizerESystem',EnergizerESystem);
AirShipFactory.registerSystem('LightESystem',LightESystem);
AirShipFactory.registerSystem('PerpetualESystem',PerpetualESystem);
