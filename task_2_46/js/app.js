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

    this.state.start('game')

  }
};
game.states.game = function(){
  
  var sprite ;
  var distX,distY,moving = false;;
  this.preload = function(){
  };
  
  this.create = function(){
    game.stage.backgroundColor = "#4488AA";

    var bmd = game.add.bitmapData(40,40);
    bmd.ctx.beginPath();
    bmd.ctx.arc(20,20,20,0,Math.PI*2,false);
    bmd.ctx.fillStyle = "#ffff00";
    bmd.ctx.fill();
    sprite = game.add.sprite(200, 200, bmd);
    sprite.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(sprite);
    game.input.onDown.add(move,this)
  };
  this.update = function(){
    console.log(moving);
    if (moving&&game.physics.arcade.distanceToXY(sprite,distX,distY) <10)
    {
      console.log(distX,distY);
      //  Make the object seek to the active pointer (mouse or touch).
      sprite.body.velocity.set(0);
      moving = false;
    }
  };

  function move(eve){
    distX = eve.x;distY = eve.y;
    game.physics.arcade.moveToXY(sprite,distX,distY,400);
    moving = true;
  }


};




game.state.add('boot',game.states.boot);
game.state.add('game',game.states.game);
//启动游戏
game.state.start('boot');

