/**
 * Created by zd98 on 2016/4/12.
 */
var game = new Phaser.Game('100%','100%',Phaser.WEBGL,'container');

game.states = {};

game.states.boot = function(){
  this.preload = function(){

  };

  this.create = function(){
    this.input.maxPointers = 1;
    if(!game.device.desktop){   //移动端
      //设置适配模式(全屏)
      this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

    }else{
      this.scale.setGameSize(480,600);
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }
    this.scale.refresh();
  }
};
game.state.add('boot',game.states.boot);
//启动游戏
game.state.start('boot');

