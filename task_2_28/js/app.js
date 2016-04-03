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