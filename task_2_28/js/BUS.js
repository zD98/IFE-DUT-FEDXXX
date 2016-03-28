/**
 * Created by zd98 on 2016/3/28.
 */
var BUS;
BUS = function () {
  //丢包率
  var plRate = 0.1;
  var subscribers = {
    airship: [],
    planet: []
  };

  return {
    publish: publish,
    register: register
  };
  /**
   *
   * @param sub
   * @param msg
   */
  function send(sub,msg){
    let promise =  new Promise(function(resolve,reject){
      setTimeout(function(){
        if(Math.random()<plRate){
          reject("lose");
        }else{
          sub.receiver.receiveMsg(msg);
          resolve("success");
        }
      },300);
    });

    promise
      .then()
      .reject(function(err){
        if(err == "lose"){
          send(sub,msg);
        }
      })
  }

  /**
   *
   * @param type 希望接受消息的type
   * @param msg  二进制消息
   */
  function publish(type, msg) {
    var subs = subscribers[type];
    for (let i = 0, len = subs.length; i < len; i++) {
      send(subs[i],msg);
    }
  }

  /**
   *
   * @param type 希望接受消息的类型
   * @param uuid 接受者的id
   * @param r    接受者
   */
  function register(type, uuid, r) {
    var sub = {
      id: uuid,
      receiver: r
    };
    subscribers[type].push(sub);
  }
}();