/**
 * Created by zd98 on 2016/3/28.
 */
function DataCenter(planet){
  this.planet = planet;
  this.db = [];
  this.ele = null;
  this.init();
}

DataCenter.prototype = {
  constructor:DataCenter,
  init:function(){
    //this.ele = document.querySelector();
  //  写一个模块 监听消息后用来处理Monitor
    //And 添加一个什么东西显示控制台？
  },
  processMsg:function(msg){
    let obj = Adapter.planet.convertByteToObj(msg);
    this.planet.$monitor.detectMsg(obj);
  }
};
/**
 * Created by zd98 on 2016/4/2.
 */
var shipCtrl =function(){

  var view = document.querySelector('.director');
  var list = {};

  return {
    addShipCtrl:addShipCtrl,
    removeShipCtrl:removeShipCtrl
  };

  function removeShipCtrl(id){
    view.removeChild(list[id]);
    delete  list[id];
  }

  function addShipCtrl(director,id){
    var ele = document.createElement('div');
    ele.classList.add('ship-ctrl');
    ele.innerHTML = `对${id}号飞船下达指令<button class="btn run">开始飞行</button><button class="btn stop">停止飞行</button><button class="btn destroy">销毁</button>`;
    view.appendChild(ele);
    ele.addEventListener('click',function(event){
      var target = event.target;
      if(target.classList.contains('run')){
        director.runShip(id);
      }else if(target.classList.contains('stop')){
        director.stopShip(id);
      }else if(target.classList.contains('destroy')){
        director.destroyShip(id);
        view.removeChild(ele);
      }else{

      }
    });
    list[id] = ele;
  }
}();
/**
 * Created by zd98 on 2016/3/29.
 */
function Director(planet){
  this.$planet = planet;
}
Director.prototype = {
  constructor:Director,
  createShip:function(dynamicSystem, energySystem){
    try{
      var id = this.$planet.createShip(dynamicSystem, energySystem);
      shipCtrl.addShipCtrl(this,id);
    }catch (e){
      alert("Ships are full!");
      console.log(e);
    }
  },
  destroyShip:function(id){
    var command = "destroy";
    this.$planet.sendCmd(id,command);
  },
  runShip:function(id){
    var command = "run";
    this.$planet.sendCmd(id,command);
  },
  stopShip:function(id){
    var command = "stop";
    this.$planet.sendCmd(id,command);
  }
};








/**
 * Created by zd98 on 2016/4/2.
 */
var MonitorCtrl = function(){
  var view = document.querySelector('.screen');
  var list = {};

  return {
   detectShip:detectShip
  };

  function removeShip(id){
    view.removeChild(list[id]);
    delete  list[id];
  }

  function detectShip(msg){
    if(list[msg.id] == null) {
      let ele = document.createElement('div');
      ele.classList.add('row');
      ele.innerHTML = `<div class="col air">${msg.id}号</div><div class="col dynamic">${msg.dynamic}</div><div class="col energy">${msg.energy}</div><div class="col state">${msg.state}</div><div class="col left">${msg.left}%</div>`;
      view.appendChild(ele);
      list[msg.id] = ele;
    }else{
      let ele =  list[msg.id];
      ele.innerHTML = `<div class="col air">${msg.id}号</div><div class="col dynamic">${msg.dynamic}</div><div class="col energy">${msg.energy}</div><div class="col state">${msg.state}</div><div class="col left">${msg.left}%</div>`
    }
    if(msg.state == "destroy"){
      setTimeout(function () {
        removeShip(msg.id);
      },1000);
    }
  }
}();
/**
 * Created by zd98 on 2016/3/28.
 */
function Monitor(planet){
  this.planet = planet;
}

Monitor.prototype = {
  constructor:Monitor,
  detectMsg: function(msg){

    //msg.id = 00 msg.state = 00  msg.energy = 35;
    console.log(msg);
    MonitorCtrl.detectShip(msg);
  }
};
/**
 * Created by zd98 on 2016/3/28.
 */
function Planet(){
  
  this.$dc = new DataCenter(this);
  this.$emitter = new Emitter('planet');
  this.$receiver = new Receiver('airship');
  this.$monitor = new Monitor(this);
  this.init();
}

Planet.prototype = {
  constructor:Planet,
  init:function(){
    this.$receiver.receiveMsg = function(msg){
      console.log("planet receiver");
      this.$dc.processMsg(msg);
    }.bind(this);
  },
  sendCmd:function(id, command){
    var obj = {};
    obj.id = id;
    obj.command = command;
    var msg = Adapter.planet.convertObjToByte(obj);
    console.log(msg);
    this.$emitter.sendMsg(msg);
  }
  ,
  createShip:function(dynamicSystem, energySystem){
    return AirShipFactory.createAirShip(dynamicSystem, energySystem);
  }


};


