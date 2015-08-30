window.onload = function() {

  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
    preload: preload,
    create: create,
    update: update
  });

  function preload() {
    game.load.image('sprite_neoclub', 'asset/sprite_neoclub.png');
    game.load.spritesheet('ss_buy', 'asset/spritesheet_buy.png', 100, 100, 2)
  }

  var BTNNeoclub;
  var TXTClickCount;
  var TXTFps;

  var clickCount = 0;
  var farmCount = 0;
  var frameCount = 0;

  function create() {
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
      clickCount -= 10;
      farmCount++;
    },this,-1,1, 0,1);
    BTNBuyFarm.anchor.set(1, 0);

    // 设置统计
    TXTClickCount = game.add.text(game.world.centerX, game.world.centerY - 40, '0', {
      fill: '#FFFFFF'
    });
    TXTClickCount.anchor.set(0.5);

    // 设置左上角fps
    TXTFps = game.add.text(0, 0, 'fps:', {
      fill: '#FFFFFF'
    });

    // 设置右上角提示
    var TXTHint = game.add.text(game.world.width, 0, '点击中间按钮，可以计数', {
      fill: '#FFFFFF'
    });
    TXTHint.anchor.set(1, 0);

    // 初始化事件
    game.time.events.loop(Phaser.Timer.SECOND, function() {
      TXTFps.setText('fps:' + frameCount);
      frameCount = 0;
    });
  }

  function update() {
    // 显示fps
    frameCount++;

    // 计算养牛场
    var growSpeed = farmCount * 1 / 60;
    clickCount += growSpeed;

    // 显示点击统计
    TXTClickCount.setText('牛力:' + clickCount.toFixed(2));
  }
};
