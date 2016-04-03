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
