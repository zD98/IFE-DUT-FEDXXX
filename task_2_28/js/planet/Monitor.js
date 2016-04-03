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