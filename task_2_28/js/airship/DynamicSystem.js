/**
 * Created by zd98 on 2016/3/28.
 */
function DynamicSystem(ship) {
  this.ship = ship||null;
  this.velocity = 20;
  this.consumption = 5;
}

DynamicSystem.prototype = {
  constructor:DynamicSystem,
  consumpt: function () {
    this.ship.energy -= this.consumption;
  },
  getVelocity: function () {
    return this.velocity;
  }
};
