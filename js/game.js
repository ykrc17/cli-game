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

  var MAX_MESSAGE_QUEUE_SIZE = 10;

  var COLOR_WHITE = '#FFFFFF';
  var COLOR_BLACK = '#000000';
  var COLOR_GREEN = '#00FF00';

  var messageQueue = [];
  var showCursor = false;

  function create() {
    game.stage.setBackgroundColor(COLOR_BLACK);

    addMessage('小游♂戏 by yk');

    game.time.events.loop(500, function() {
      showCursor = !showCursor;
    });
  }

  function update() {}

  function render() {
    for (var i in messageQueue) {
      renderDebug(messageQueue[i], i, i == messageQueue.length - 1);
    }
  }

  function renderDebug(text, line, isLast) {
    var message = '> ' + text;
    if (isLast && showCursor) {
      message += '_';
    }
    game.debug.text(message, 2, 16 * line + 16, COLOR_GREEN);
  }

  function addMessage(message) {
    messageQueue.push(message);
    messageQueue.push('');
    while (messageQueue.length > MAX_MESSAGE_QUEUE_SIZE) {
      messageQueue.shift();
    }
  }
};
