/**
 * Created by zd98 on 2016/3/28.
 */
var Adapter  = {
  ship:{
    convertObjToByte:function(obj){
      var id = obj.id.toString(2);
      var dynamic = obj.dynamic;
      var energy = obj.energy;
      switch (dynamic){
        case "AheadDSystem":
          dynamic = "00";
          break;
        case "GallopDSystem":
          dynamic = "01";
          break;
        case "TranscendDSystem":
          dynamic = "10";
          break;
      }
      switch (energy){
        case "EnergizerESystem":
          energy = "00";
          break;
        case "LightESystem":
          energy = "01";
          break;
        case "PerpetualESystem":
          energy = "10";
          break;
      }
      var state = obj.state;
      switch (state){
        case "run":
          state = "0001";
          break;
        case "stop":
          state = "0010";
          break;
        case "destroy":
          state = "1100";
      }
      var left = obj.left.toString(2);
      while(id.length!=4){
        id = "0"+id;
      }
      while(left.length!=8){
        left = "0"+left;
      }
      return id+dynamic+energy+state+left;
    },
    convertByteToObj:function(byte){
      var obj = {};
      obj.id = parseInt(byte.slice(0,4),2);
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
      return obj;
    }

  },
  planet:{
    convertObjToByte:function(obj){
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
      while(id.length!=4){
        id = "0"+id;
      }
      return id+command;
    },
    convertByteToObj:function(byte){
      var obj = {};
      obj.id = parseInt(byte.slice(0,4),2);
      let dynamic = byte.slice(4,6);
      let energy  = byte.slice(6,8);
      
      switch (dynamic){
        case "00":
          obj.dynamic = "AheadDSystem";
          break;
        case "01":
          obj.dynamic = "GallopDSystem";
          break;
        case "10":
          obj.dynamic = "TranscendDSystem";
          break;
      }
      switch (energy){
        case "00":
          obj.energy = "EnergizerESystem";
          break;
        case "01":
          obj.energy = "LightESystem";
          break;
        case "10":
          obj.energy = "PerpetualESystem";
          break;
      }
      switch (byte.slice(8,12)){
        case "0001":
          obj.state = "run";
          break;
        case "0010":
          obj.state = "stop";
          break;
        case "1100":
          obj.state = "destroy";
          break;
      }
      obj.left = parseInt(byte.slice(12),2);
      return obj;
    }
  }

};

