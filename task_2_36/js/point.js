/**
 * Created by zd98 on 2016/3/25.
 */
function Point(x,y){
  this.x = x||0;
  this.y = y||0;
  this.G = 0;
  this.H = 0;
  this.F = 0;
  this.isHinder = false;
  this.isClosed = false;
  this.prePoint = null;
}
//简单的用距离计算H
Point.prototype.setH = function(end){
  this.H = 5*(Math.abs(end.x-this.x)+Math.abs(end.y-this.y));
};
Point.prototype.setG = function(g){
  this.G +=g ;
};
Point.prototype.setF = function(){
  this.F = this.G+this.H;
};