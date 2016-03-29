/**
 * Created by zd98 on 2016/3/28.
 */
function DynamicSystem(){
  this.velocity = 20;
  this.consumption = 5;
}

DynamicSystem.prototype.consumpt = function(){


};

DynamicSystem.prototype.getVelocity = function(){

};

function AheadDSystem(ship){
  console.log("create AheadD");
  this.ship = ship||null;
  this.velocity = 30;
  this.consumption = 5;
}
AheadDSystem.prototype = new DynamicSystem();

function GallopDSystem(ship){
  console.log("create GallopD");
  this.ship = ship||null;
  this.velocity = 50;
  this.consumption = 7;
}
GallopDSystem.prototype = new DynamicSystem();

function TranscendDSystem(ship){
  console.log("create TranscendD");
  this.ship = ship||null;
  this.velocity = 80;
  this.consumption = 9;
}
TranscendDSystem.prototype = new DynamicSystem();

AirShipFactory.registerSystem('dynamicSystem',DynamicSystem);
AirShipFactory.registerSystem('AheadDSystem',AheadDSystem);
AirShipFactory.registerSystem('GallopDSystem',GallopDSystem);
AirShipFactory.registerSystem('TranscendDSystem',TranscendDSystem);