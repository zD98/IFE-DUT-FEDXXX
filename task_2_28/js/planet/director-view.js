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