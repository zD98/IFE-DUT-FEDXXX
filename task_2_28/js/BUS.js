/**
 * Created by zd98 on 2016/3/28.
 */
var BUS = function(){

  var plRate = 0.1;
  var subscribers = {
    airship:[],
    planet:[]
  };

  return {
    publish: function(type, msg) {

      var subs = subscribers[type];
      for (let i = 0, len = subs.length; i < len; i++) {
        send(subs[i],msg);
      }
      function send(sub,msg){
        let promise =  new Promise(function(resolve,reject){
          setTimeout(function(){
            if(Math.random()<plRate){
              console.log("BUS receiver lose");
              reject("lose");
            }else{
              sub.receiver.receiveMsg(msg);
              console.log("BUS receiver success");
              resolve("success");
            }
          },300);
        });

        promise
          .then()
          .catch(function(err){
            if(err == "lose"){
              send(sub,msg);
            }
          })
      }
    },
    register: function(type, uuid, r) {
      var sub = {
        id: uuid,
        receiver: r
      };
      subscribers[type].push(sub);
    },
    removeRegister:function(type,id){
      var subs = subscribers[type];
      if(subs.length==0){
        return ;
      }
      for(let i=0,len=subs.length;i<len;i++){
        if(subs[i].id == id){
          subs.splice(i,1);
          break;
        }
      }
    }
  };

}();