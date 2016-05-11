/**
 * Created by zd98 on 2016/3/26.
 */
var editor = function(){
  var lineCount = 1;
  var countList = document.querySelector('.lineCount');
  var textarea = document.querySelector('#textarea');
  var wrongLine = null;
  textarea.addEventListener('keyup',function(){
    clear();
    var count = textarea.value.split(/\r*\n/).length;
    var frag = document.createDocumentFragment();
    while (count!==lineCount){
      if(lineCount>count){
        countList.removeChild(countList.lastElementChild);
        lineCount--;
      }else{
        var line = document.createElement('div');
        line.classList.add('line');
        line.innerHTML = ++lineCount;
        frag.appendChild(line);
      }
    }
    countList.appendChild(frag);
  });
  textarea.addEventListener('scroll',function(event){
    var top = textarea.scrollTop;
    console.log(top);
    countList.style.top  = -top+"px";
  });

  return {
    addWrong:addWrong,
    refresh:refresh
  };
  function clear(){
    if(wrongLine) {
      var lines = document.querySelectorAll('.line');
      lines[wrongLine].classList.remove('error');
      wrongLine = null;
    }
  }
  function refresh(){
    textarea.value = "";
    var count = 1;
    while (count!==lineCount){
        countList.removeChild(countList.lastElementChild);
        lineCount--;
    }
  }
  function addWrong(i){
      var lines = document.querySelectorAll('.line');
    lines[i].classList.add('error');
    wrongLine = i;
  }
}();