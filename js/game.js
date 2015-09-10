window.onload = function() {

  var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', {
    preload: preload,
    create: create,
    update: update,
    render: render
  });

  function preload() {
    game.load.image('sprite_neoclub', 'asset/sprite_neoclub.png');
    game.load.spritesheet('ss_buy', 'asset/spritesheet_buy.png', 100, 100, 2);
    game.load.spritesheet('ss_food', 'asset/spritesheet_food.png', 100, 100, 2);
  }

  var COLOR_WHITE = '#FFFFFF';
  var COLOR_BLACK = '#000000';
  var COLOR_GREEN = '#00FF00';

  var FPS = 60;
  var COW_BORN_RATE = 1 / 40; // 一头牛40天可以生一头牛
  var COW_EAT_RATE = 1 / 10; // 一头牛10天可以吃一头牛

  var buttonNeoclub;
  var labelHint;

  var neoclubCount = 0;
  var neoclubSpeed = 0;
  var foodCount = 0;
  var foodSpeed = 0;
  var farmCount = 0;
  var formWorker = 0;

  function create() {
    game.time.advancedTiming = true;
    game.stage.setBackgroundColor(0x000000);

    // 设置按钮
    buttonNeoclub = game.add.button(game.world.centerX, game.world.centerY + 20, 'sprite_neoclub', function() {
      neoclubCount++;
    });
    buttonNeoclub.anchor.set(0.5);
    buttonNeoclub.events.onInputUp.add(function() {
      doTween(buttonNeoclub, 1.0);
    });
    buttonNeoclub.events.onInputDown.add(function() {
      doTween(buttonNeoclub, 0.9);
    })

    // 设置购买养牛场
    // var BTNBuyFarm = game.add.button(game.world.width, 40, 'ss_buy', function() {
    //   if (neoclubCount >= 10) {
    //     neoclubCount -= 10;
    //     farmCount++;
    //   } else {
    //     showLabel('你太穷了');
    //   }
    // }, this, 1, 1, 0, 1);
    // BTNBuyFarm.anchor.set(1, 0);
    // var TXTBuyFarm = game.add.text(game.world.width - BTNBuyFarm.width, BTNBuyFarm.y, '买养牛场\n价格:10→\n效率:0.1/s', {
    //   fill: COLOR_WHITE
    // });
    // TXTBuyFarm.anchor.set(1, 0);

    var buttonBuyFood = game.add.button(game.world.width, 40, 'ss_food', function() {
      foodCount++;
    }, this, 0, 0, 1);
    buttonBuyFood.anchor.set(1, 0);
    var labelBuyFood = game.add.text(game.world.width - buttonBuyFood.width, buttonBuyFood.y + buttonBuyFood.height / 2,
      '买食物(1个)\n*没食物牛会吃牛', {
        fill: COLOR_WHITE
      });
    labelBuyFood.anchor.set(1, 0.5);

    // 设置右上角提示
    var TXTHint = game.add.text(game.world.width, 0, '点击中间按钮，可以加钱', {
      fill: COLOR_WHITE
    });
    TXTHint.anchor.set(1, 0);
  }

  function update() {
    // 计算养牛场
    // var growSpeed = farmCount * 0.1 / 60;
    // neoclubCount += growSpeed;

    neoclubSpeed = 0;
    foodSpeed = 0;

    if (neoclubCount > 2) {
      neoclubSpeed += neoclubCount * COW_BORN_RATE / FPS;
    }
    if (foodCount <= 0) {
      neoclubSpeed -= neoclubCount * COW_EAT_RATE / FPS;
    } else {
      foodSpeed -= neoclubCount * COW_EAT_RATE / FPS;
    }
    neoclubCount += neoclubSpeed;
    foodCount += foodSpeed;
    if (neoclubCount < 0) {
      neoclubCount = 0;
    }
    if (foodCount < 0) {
      foodCount = 0;
    }
  }

  function render() {
    // 显示点击统计
    var i = 1;
    renderDebug('小游♂戏 by yk', i++);
    renderDebug('fps:' + game.time.fps + '/' + game.time.desiredFps, i++);
    renderDebug('牛:' + neoclubCount.toFixed(2) + '(' + (neoclubSpeed * 60).toFixed(2) + '/s)', i++);
    renderDebug('食物:' + foodCount.toFixed(2) + '(' + (foodSpeed * FPS).toFixed(2) + '/s)', i++);
  }

  function renderDebug(text, line) {
    game.debug.text(text, 2, 16 * line, COLOR_GREEN);
  }

  function showLabel(hint) {
    if (labelHint) {
      labelHint.destroy();
      labelHint = null;
    }
    var labelHint = game.add.text(game.world.centerX, 40, hint, {
      fill: '#FFFFFF'
    });
    labelHint.anchor.set(0.5);
    game.time.events.add(Phaser.Timer.SECOND * 2, function() {
      game.add.tween(labelHint).to({
        alpha: 0
      }, 2000, Phaser.Easing.Linear.None, true);
    });
  }
};
