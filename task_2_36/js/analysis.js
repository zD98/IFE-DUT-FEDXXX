/**
 * Created by zd98 on 2016/3/22.
 */
var analysis = function(){


  return{

  };
  //匹配字符串 解析命令 解析数字 
  function analyze(str){
  //  1
    var directives = str.split(/\n|\r/);
  //  2
    var result = null;
    for (var i=0,len=directives.length;i<len;i++){
      result = analyzeDirective(directives[i]);
    }
  }
  function analyzeDirective(directive){
    var cmds = directive.split(/\s/);
    //switch选择  或者用hash解决
    var err = false;
    switch(cmds[0]){
      case 'GO':
        if(cmds.length<3){
          cmds[1].match(/^[0-9]*$/);
          var num = parseInt(cmds[1]);
        }else{
          return false;
        }
        break;
      case 'MOV':
        break;
      case 'TUN':
        var d = cmds[1];
        if(cmds.length!=2||d!="LEF"||d!="RIG"||d!="BAC"){
          return false;
        }else{
          return [];
        }
        break;
      case 'TRA':
        break;
      case 'BUID':
        break;
      case 'BRU':
        break;
      default:

    }
  }
}();