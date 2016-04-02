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

  function addShipCtrl(id){
    var ele = document.createElement('div');
    ele.classList.add('ship-ctrl');
    ele.innerHTML = `对${id}号飞船下达指令<button class="btn">开始飞行</button><button class="btn">停止飞行</button><button class="btn">销毁</button>`;
    view.appendChild(ele);
    ship[id] = ele;
  }
}();