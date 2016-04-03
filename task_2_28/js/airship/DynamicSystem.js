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