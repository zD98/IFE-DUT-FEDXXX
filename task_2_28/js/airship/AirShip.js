/**
 * Created by zd98 on 2016/3/28.
 */
function Airship (){
  this.$dynamicSystem = null;
  this.$energySystem = null;
  this.$signalSystem = new SignalSystem();
}
Airship.prototype = {

  constructor:Airship,
  init:init,
  //绘图用render
  render:render,
  //飞行
  run:run,
  //销毁
  destroy:destroy
};
function init(){

}
function run(){
  this.energy--;
}
function destroy(){
  
}
function render(){
  
}
