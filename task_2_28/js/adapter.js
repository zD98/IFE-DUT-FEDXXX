/**
 * Created by zd98 on 2016/3/28.
 */
var Adapter  = {

  convertObjtoByte:function(obj){

    var id = obj.id.toString(2);
    var command = obj.command;
    switch (command){
      case "run":
        command = "0001";
        break;
      case "stop":
        command = "0010";
        break;
      case "destroy":
        command = "1100";
    }
    var energy = (obj.energy||0).toString(2);
    while(id.length!=4){
      id = "0"+id;
    }
    while(energy.length!=8){
      energy = "0"+energy;
    }
    return id+command+energy;

  },
  convertBytetoObj:function(byte){
    var obj = {};
    obj.id = parseInt(byte.slice(0,3),2);
    switch (byte.slice(4,8)){
      case "0001":
        obj.command = "run";
        break;
      case "0010":
        obj.command = "stop";
        break;
      case "1100":
        obj.command = "destroy";
        break;
    }
    obj.energy = parseInt(byte.slice(8),2);
    return obj;
  }
};

