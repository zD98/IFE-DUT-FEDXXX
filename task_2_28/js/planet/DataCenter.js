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
    console.log(obj);
    this.planet.$monitor.detectMsg(obj);
  }
};