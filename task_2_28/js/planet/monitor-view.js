/**
 * Created by zd98 on 2016/4/2.
 */
var MonitorCtrl = function(){
  var view = document.querySelector('.screen');
  var list = {};

  return {
   detectShip:detectShip
  };

  function removeShip(id){
    view.removeChild(list[id]);
    delete  list[id];
  }

  function detectShip(msg){
    if(list[msg.id] == null) {
      let ele = document.createElement('div');
      ele.classList.add('row');
      ele.innerHTML = `<div class="col air">${msg.id}号</div><div class="col dynamic">${msg.dynamic}</div><div class="col energy">${msg.energy}</div><div class="col state">${msg.state}</div><div class="col left">${msg.left}%</div>`;
      view.appendChild(ele);
      list[msg.id] = ele;
    }else{
      let ele =  list[msg.id];
      ele.innerHTML = `<div class="col air">${msg.id}号</div><div class="col dynamic">${msg.dynamic}</div><div class="col energy">${msg.energy}</div><div class="col state">${msg.state}</div><div class="col left">${msg.left}%</div>`
    }
    if(msg.state == ""){
      setTimeout(function () {
        removeShip(msg.id);
      },1000);
    }
  }
}();