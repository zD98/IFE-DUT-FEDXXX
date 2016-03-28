/**
 * Created by zd98 on 2016/3/28.
 */
function EnergySystem(ship){
  this.ship = ship||null;
  this.energy = 100;
  this.gain = 2;
}

EnergySystem.prototype = {
  constructor:EnergySystem,
  //每秒获取能源
  charge:function(){
    this.energy += this.gain;
    this.ship.energy = this.energy;
  },
  getEnergy:function(){
    return this.energy;
  }
};