window.onload = function() {

  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
    preload: preload,
    create: create,
    update: update
  });

  function preload() {
    game.load.image('neoclub', 'icon_neoclub.png');
  }

  var BTNNeoclub;
  var TXTClickCount;
  var TXTFps;

  var clickCount;
  var farmCount;
  var time;
  var frameCount;

  function create() {
    game.stage.setBackgroundColor(0x000000);

    // 设置按钮
    BTNNeoclub = game.add.button(game.world.centerX, game.world.centerY + 20, 'neoclub', addCount);
    BTNNeoclub.anchor.set(0.5);

    // 设置购买养牛场
    var TXTBuyFarm = game.add.text(game.world.width, 40, '点我购买养牛场(10块)', {
      fill: '#FFFFFF'
    });
    TXTBuyFarm.anchor.set(1, 0);
    TXTBuyFarm.inputEnabled = true;
    TXTBuyFarm.events.onInputUp.add(addFarm);

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

    // 初始化数据
    clickCount = 0;
    farmCount = 0;
    frameCount = 0;
    time = new Date().getTime();
  }

  function update() {
    // 显示fps
    var now = new Date().getTime();
    if (now - time > 1000) {
      time = now;
      TXTFps.setText('fps:' + frameCount);
      frameCount = 0;
    } else {
      frameCount++;
    }

    // 计算养牛场
    var growSpeed = farmCount * 1 / 60;
    clickCount += growSpeed;

    // 显示点击统计
    TXTClickCount.setText('牛力:' + clickCount.toFixed(2));
  }

  function addCount() {
    clickCount++;
  }

  function addFarm() {
    clickCount -= 10;
    farmCount++;
  }
};
