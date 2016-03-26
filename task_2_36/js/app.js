var go = document.querySelector('.go');
var refresh = document.querySelector('.refresh');
var random = document.querySelector('.random');
var draw = document.querySelector('.draw');
var text = document.querySelector('textarea');
var grid = document.querySelector('.hero');

hero.init(grid);
Map.getInstance().initMap(10,10);

go.addEventListener('click',function(){
  var cmds = analysis.analyze(text.value);
  hero.receiveActions(cmds);
});
random.addEventListener('click',function(){
  var p = hero.getPosition();
  Wall.randomWall(p[0],p[1]);
});
refresh.addEventListener('click',function () {
  editor.refresh();
  Wall.refresh();
  hero.refresh();
  
});

draw.addEventListener('click',function (){
  text.value = "MOV TO 3,7\nTUN RIG\nBUILD\nTRA TOP\nBUILD\nTRA TOP\nBUILD\nTRA TOP\nBUILD\nTUN LEF\nBUILD\nTRA RIG\nBUILD\nMOV TO 3,3\nTUN LEF\nBUILD\nTRA BOT\nTUN RIG\nBUILD\nTRA RIG\nBUILD\nMOV TO 8,7\nTUN RIG\nBUILD\nTRA TOP\nBUILD\nTRA TOP\nBUILD\nTRA TOP\nBUILD\nTRA TOP\nBUILD\nMOV TO 8,6\nBUILD\nTRA RIG\nBUILD\nTUN BAC\nBUILD\nTRA LEF\nBUILD\nMOV TO 9,4\nTUN RIG\nBUILD\nTRA LEF\nBUILD\nMOV TO 5,5\nTUN BAC\nMOV BOT 5\nTRA LEF 4\nTUN BAC";
  var cmds = analysis.analyze(text.value);
  hero.receiveActions(cmds);
});