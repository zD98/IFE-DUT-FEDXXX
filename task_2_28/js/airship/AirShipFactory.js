/**
 * Created by zd98 on 2016/3/28.
 */
var  AirShipFactory = function(){
  var types = {};
  return {
    registerSystem : register,
    createAirShip:create
  };
  
  function register(type, System){
    types[type] = System;
  }
  
  function create(dynamicSystem, energySystem){
    var airship  = new Airship();
    airship.$dynamicSystem = types[dynamicSystem];
    airship.$energySystem = types[energySystem];
    
    return airship;
  }
}();
