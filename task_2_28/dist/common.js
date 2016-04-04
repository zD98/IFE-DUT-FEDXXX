/**
 * Created by zd98 on 2016/3/28.
 */
var BUS = function(){

  var plRate = 0.1;
  var subscribers = {
    airship:[],
    planet:[]
  };

  return {
    publish: function(type, msg) {

      var subs = subscribers[type];
      for (let i = 0, len = subs.length; i < len; i++) {
        send(subs[i],msg);
      }
      function send(sub,msg){
        let promise =  new Promise(function(resolve,reject){
          setTimeout(function(){
            if(Math.random()<plRate){
              console.log("BUS receiver lose");
              reject("lose");
            }else{
              sub.receiver.receiveMsg(msg);
              console.log("BUS receiver success");
              resolve("success");
            }
          },300);
        });

        promise
          .then()
          .catch(function(err){
            if(err == "lose"){
              send(sub,msg);
            }
          })
      }
    },
    register: function(type, uuid, r) {
      var sub = {
        id: uuid,
        receiver: r
      };
      subscribers[type].push(sub);
    },
    removeRegister:function(type,id){
      var subs = subscribers[type];
      if(subs.length==0){
        return ;
      }
      for(let i=0,len=subs.length;i<len;i++){
        if(subs[i].id == id){
          subs.splice(i,1);
          break;
        }
      }
    }
  };

}();
/**
 * Created by zd98 on 2016/3/28.
 */
/**
 * 
 * @param type emitter是Emitter的发送者
 * @constructor
 */
function Emitter(type){
  this.type = type;
}

Emitter.prototype = {
  constructor:Emitter,
  sendMsg:function(msg){
  BUS.publish(this.type,msg);
},
  destroy:function(){
    
  }
};



/**
 * Created by zd98 on 2016/3/28.
 */
/**
 * 
 * @param type receiver 是type的订阅者
 * @constructor
 */
function Receiver(type){
  this.uuid = new Date().getTime();
  this.target = type;
  this.init();
}

Receiver.prototype = {
  init:function(){
    BUS.register(this.target,this.uuid,this);
  },
  constructor: Receiver,
  receiveMsg: function(){
    console.log("undo msg");
  },
  destroy:
    function(){
      BUS.removeRegister(this.target,this.uuid);
    }
};



/**
 * Created by zd98 on 2016/3/28.
 */
var Adapter  = {
  ship:{
    convertObjToByte:function(obj){
      var id = parseInt(obj.id).toString(2);
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
      var id = parseInt(obj.id).toString(2);

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
      console.log(byte.slice(0,4));
      let dynamic = byte.slice(4,6);
      let energy  = byte.slice(6,8);
      
      switch (dynamic){
        case "00":
          obj.dynamic = "Ahead";
          break;
        case "01":
          obj.dynamic = "Gallop";
          break;
        case "10":
          obj.dynamic = "Transcend";
          break;
      }
      switch (energy){
        case "00":
          obj.energy = "Energizer";
          break;
        case "01":
          obj.energy = "Light";
          break;
        case "10":
          obj.energy = "Perpetual";
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


/**
 * Created by zd98 on 2016/4/1.
 */
//程序入口

(function(){

  var sphere = new Sphere(3,32);
  gl.addObject(sphere);
  setInterval(function(){
    gl.render();
  },20);

  var planet = new Planet();
  var director = new Director(planet);
  var addShip = document.querySelector('#add-ship');
  addShip.addEventListener('click',function(){
    
    var d = document.querySelector('input[name="dynamic"]:checked');
    var e = document.querySelector('input[name="energy"]:checked');
    if(d!==null&&e!=null){
      d = d.value;
      e = e.value;
      director.createShip(d,e);
    
    }else{
      alert('请选择动力系统 and 能源系统');
    }
  })
  
})();