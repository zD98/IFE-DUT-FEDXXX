/**
 * Created by zd98 on 2016/3/22.
 */
//分析命令集 检测错误
var analysis = function(){
  var syntax = {
    GO:go,
    TUN:tun,
    TRA:tra,
    MOV:mov
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
      if(result!=false){
        commands.push(result);
      }else{
        tag = i;
        break;
      }
    }
    if(tag){
      console.log(i,'wrong');
    }
    return commands;
  }
  function analyzeDirective(directive){
    var cmds = directive.split(/\s/);
    return !!syntax[cmds[0]]?syntax[cmds[0]].apply(null,cmds.slice(1)):false;
  }
  function isNum(str){
    var step = null;
    if(str!=undefined){
      str = str.trim();
      if(str.match(/^[0-9]*$/)) {
        step = parseInt(str)
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
    var step = isNum(steps);
    return step?['go',step]:step;
  }
  function tun(dir){
    return dir==undefined||!dir.match(/^LEF$|^RIG$|^BAC$/) ?false:['tun',dir];
  }
  function tra(dir,steps){
    if(arguments.length>2){
      return false;
    }
    if(dir==undefined||!dir.match(/^LEF$|^RIG$|^TOP$|^BOT$/)){
      return false;
    }
    var step = isNum(steps);
    return step?['tra',dir,step]:false;
  }
  function mov(dir,steps){
    if(arguments.length>2){
      return false;
    }
    if(dir==undefined||!dir.match(/^LEF$|^RIG$|^TOP$|^BOT$/)){
      return false;
    }
    var step = isNum(steps);
    return step?['mov',dir,step]:false;
  }
}();

