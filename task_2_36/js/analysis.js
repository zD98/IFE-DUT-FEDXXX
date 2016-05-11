/**
 * Created by zd98 on 2016/3/22.
 */
//分析命令集 检测错误
var analysis = function(){
  var syntax = {
    GO:go,
    TUN:tun,
    TRA:tra,
    MOV:mov,
    BUILD:build,
    BRU:bru
  };
  
  return{
    analyze:analyze
  };
  //匹配字符串 解析命令 解析数字 
  function analyze(str){
    var commands = [],tag = undefined;
    var directives = str.split(/\n|\r/);
    var result = null;
    for (var i=0,len=directives.length;i<len;i++){
      result = analyzeDirective(directives[i]);
      if(result!==false){
        commands.push(result);
      }else{
        tag = i;
        editor.addWrong(tag);
        break;
      }
    }
    if(tag){
      return [];
    }
    return commands;
  }
  function analyzeDirective(directive){
    var cmds = directive.split(/\s+/);
    return syntax[cmds[0]]!==undefined?syntax[cmds[0]].apply(null,cmds.slice(1)):false;
  }
  function isNum(str){
    var step = null;
    if(str!=undefined){
      str = str.trim();
      if(str.match(/^[0-9]*$/)!=null) {
        step = parseInt(str);
      }
    }else{
      step =1;
    }
    return step;
  }
  function go(steps){

    if(arguments.length>1){
      return false;
    }
    if(steps!==undefined&&steps.length == 0){
      steps = undefined;
    }
    var step = isNum(steps);
    return step?['go',step]:step;
  }
  function tun(dir){
    if(arguments.length>1&&arguments[1].length>0){
      return false;
    }
    return dir==undefined||!dir.match(/^LEF$|^RIG$|^BAC$/) ?false:['tun',dir];
  }
  function tra(dir,steps){
    if(arguments.length>2){
      return false;
    }
    if(dir==undefined||!dir.match(/^LEF$|^RIG$|^TOP$|^BOT$/)){
      return false;
    }
    if(steps!==undefined&&steps.length == 0){
      steps = undefined;
    }
    var step = isNum(steps);
    return step?['tra',dir,step]:false;
  }
  function mov(dir,steps){
    if(arguments.length>2){
      return false;
    }
    if(dir.match(/^TO$/)){
      var p = steps;
      if(p!=undefined){
        var coord= p.split(',');

        if(isNum(coord[0])!=null&&isNum(coord[1])!=null){
          return ['moveTo',parseInt(coord[0]),parseInt(coord[1])];
        }else{
          return false;
        }
      }
    }
    if(dir==undefined||!dir.match(/^LEF$|^RIG$|^TOP$|^BOT$/)){
      return false;
    }
    if(steps!=undefined&&steps.length == 0){
      steps = undefined;
    }
    var step = isNum(steps);
    return step?['mov',dir,step]:false;
  }
  function build(){
    if(arguments.length>0&&arguments[0].length!=0){
      return false;
    }
    return ['build']
  }
  function bru(color){
    if(arguments.length>1&&arguments[1].length!=0){
      return false;
    }
    color = color.toLowerCase();
    if(color.match(/^#[0-9a-f]{3}$|^#[0-9a-f]{6}$/)){
      return ['bru',color];
    }else{
      return false;
    }

  }
}();

