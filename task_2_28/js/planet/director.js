/**
 * Created by zd98 on 2016/3/29.
 */
function Director(planet){
  this.$planet = planet;
}
Director.prototype = {
  constructor:Director,
  createShip:createShip,
  destroyShip:destroyShip,
  runShip:runShip,
  stopShip:stopShip
};

function createShip(dynamicSystem, energySystem){
  try{
    var id = this.$planet.createShip(dynamicSystem, energySystem);
    shipCtrl.addShipCtrl(this,id);
  }catch (e){
    alert("Ships are full!");
    console.log(e);
  }
}

function destroyShip(id){
  var command = "destroy";
  this.$planet.sendCmd(id,command);
}

function runShip(id){
  var command = "run";
  this.$planet.sendCmd(id,command);
}

function stopShip(id){
  var command = "stop";
  this.$planet.sendCmd(id,command);
}