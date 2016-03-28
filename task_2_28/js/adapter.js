/**
 * Created by zd98 on 2016/3/28.
 */
var Adapter  = {
  convertObjtoByte:function(obj){
    var byte = "";
    byte = "0101";
    return byte;
  },
  convertBytetoObj:function(byte){
    var obj = {};
    obj.id = "";
    obj.command = "";
    return obj;
  }
};