/**
 * Created by zd98 on 2016/4/1.
 */
//程序入口

(function(){
  
  var planet = new Planet();
  var director = new Director(planet);
  //
  // //创建飞船
  // AirShipFactory.createAirShip();
  // //摧毁飞船
  // director.runShip();
  // director.stopShip();
  // director.destroyShip();
  //
  var addShip = document.querySelector('#add-ship');
  addShip.addEventListener('click',function(){
    
    var d = document.querySelector('input[name="dynamic"]:checked');
    var e = document.querySelector('input[name="energy"]:checked');
    if(d!==null&&e!=null){
      d = d.value;
      e = e.value;
      director.createShip(d,e);


      //'<div >对1号飞船下达指令 <button class="btn">开始飞行</button> <button class="btn">停止飞行</button> <button class="btn">销毁</button> </div>'
      //写一个模块  用来生成下达命令的控件放在director里调用 
    
    }else{
      alert('请选择动力系统 and 能源系统');
    }
  })





})();