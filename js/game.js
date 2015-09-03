window.onload = function() {

  var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', {
    preload: preload,
    create: create,
    update: update,
    render: render
  });

  function preload() {
    game.load.image('sprite_neoclub', 'asset/sprite_neoclub.png');
    game.load.spritesheet('ss_buy', 'asset/spritesheet_buy.png', 100, 100, 2)
  }

  var BTNNeoclub;
  var TXTClickCount;
  var LabelHint;

  var clickCount = 0;
  var farmCount = 0;

  function create() {
    game.time.advancedTiming = true;
    game.stage.setBackgroundColor(0x000000);

    // 设置按钮
    BTNNeoclub = game.add.button(game.world.centerX, game.world.centerY + 20, 'sprite_neoclub', function() {
      clickCount++;
    });
    BTNNeoclub.anchor.set(0.5);
    BTNNeoclub.events.onInputUp.add(function() {
      doTween(BTNNeoclub, 1.0);
    });
    BTNNeoclub.events.onInputDown.add(function() {
      doTween(BTNNeoclub, 0.9);
    })

    // 设置购买养牛场
    var BTNBuyFarm = game.add.button(game.world.width, 40, 'ss_buy', function() {
      if (clickCount >= 10) {
        clickCount -= 10;
        farmCount++;
      } else {
        showLabel('你太穷了');
      }
    }, this, 1, 1, 0, 1);
    BTNBuyFarm.anchor.set(1, 0);
    var TXTBuyFarm = game.add.text(game.world.width - BTNBuyFarm.width, BTNBuyFarm.y, '买养牛场\n价格:10→\n效率:0.1/s', {
      fill: '#FFFFFF'
    });
    TXTBuyFarm.anchor.set(1, 0);

    // 设置右上角提示
    var TXTHint = game.add.text(game.world.width, 0, '点击中间按钮，可以加钱', {
      fill: '#FFFFFF'
    });
    TXTHint.anchor.set(1, 0);
  }

  function update() {
    // 计算养牛场
    var growSpeed = farmCount * 0.1 / 60;
    clickCount += growSpeed;
  }

  function render() {
    // 显示点击统计
    game.debug.text('小游♂戏 by yk', 2, 16, '#00FF00');
    game.debug.text('fps:' + game.time.fps+'/'+game.time.desiredFps, 2, 32, '#00FF00');
    game.debug.text('牛力:' + clickCount.toFixed(2), 2, 48, '#00FF00');
  }

  function showLabel(hint) {
    if (LabelHint) {
      LabelHint.destroy();
      LabelHint = null;
    }
    var LabelHint = game.add.text(game.world.centerX, 40, hint, {
      fill: '#FFFFFF'
    });
    LabelHint.anchor.set(0.5);
    game.time.events.add(Phaser.Timer.SECOND * 2, function() {
      game.add.tween(LabelHint).to({
        alpha: 0
      }, 2000, Phaser.Easing.Linear.None, true);
    });
  }
};
