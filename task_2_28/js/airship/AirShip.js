/**
 * Created by zd98 on 2016/3/28.
 */



function Airship (){
  this.$state = "";
  this.uuid = "";
  this.$dynamicSystem = null;
  this.$energySystem = null;
  this.$emitter = new Emitter("airship");
  this.$reviever = new Receiver("planet");
}
Airship.prototype = {
  constructor:Airship,
  init:init,
  //绘图用render
  render:render,
  execute:execute,
  //飞行
  run:run,
  //销毁
  destroy:destroy
};
function init(){
  this.$reviever.receiveMsg = function(msg){
    var obj = Adapter.convertBytetoObj(msg);
    if(obj.id == this.uuid){
          this.execute(obj.command);
    }
  }.bind(this);

  setTimeout(function(){
    var msg = {};
    msg = Adapter.convertObjtoByte(msg);
    this.$emitter.sendMsg(msg)
  }.bind(this),1000)

}

function execute(command){
  
}
function run(){
  this.$energySystem.charge();
  if(this.state == "fly"){
    this.$dynamicSystem.consumpt();
  }
}
function destroy(){
  
}
function render(gl){

}
