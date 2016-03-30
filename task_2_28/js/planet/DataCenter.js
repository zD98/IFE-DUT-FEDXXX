/**
 * Created by zd98 on 2016/3/28.
 */
function DataCenter(planet){
  this.planet = planet;
  this.db = [];
}

DataCenter.prototype = {
  constructor:DataCenter,
  processMsg:function(msg){
    var obj = Adapter.convertBytetoObj(msg);
    this.planet.$monitor.detectMsg(msg);
  }
};