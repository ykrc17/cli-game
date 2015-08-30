window.onload = function() {

  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
    preload: preload,
    create: create,
    update: update
  });
  var cursors;

  var logo;
  var fps;

  var time;
  var frameCount;

  function preload() {
    game.load.image('logo', 'neoclubLogo.ico');
  }

  function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.setBackgroundColor(0x000000);

    logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
    game.physics.arcade.enable(logo);

    fps = game.add.text(0, 0, '', {
      fill: '#FFFFFF'
    });
    frameCount = 0;

    var hint = game.add.text(game.world.width, 0, '使用上下左右移动', {
      fill: '#FFFFFF'
    });
    hint.position.x = game.world.width - hint.width;

    time = new Date().getTime();

    cursors = game.input.keyboard.createCursorKeys();
  }

  function update() {
    if (logo.position.x < 0) {
      logo.position.x = game.world.width;
    }
    if (logo.position.y < 0) {
      logo.position.y = game.world.height;
    }
    if (logo.position.x > game.world.width) {
      logo.position.x = 0;
    }
    if (logo.position.y > game.world.height) {
      logo.position.y = 0;
    }

    var velocityX = 0;
    var velocityY = 0;
    if (cursors.right.isDown) {
      velocityX += 200;
    }
    if (cursors.left.isDown) {
      velocityX -= 200;
    }
    if (cursors.up.isDown) {
      velocityY -= 200;
    }
    if (cursors.down.isDown) {
      velocityY += 200;
    }
    logo.body.velocity.x = velocityX;
    logo.body.velocity.y = velocityY;

    var now = new Date().getTime();
    if (now - time > 1000) {
      time = now;
      fps.setText('fps:' + frameCount);
      frameCount = 0;
    } else {
      frameCount++;
    }
  }
};
