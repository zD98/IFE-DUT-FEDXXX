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
