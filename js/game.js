window.onload = function() {

  var GAME_WIDTH = 800;
  var GAME_HEIGHT = 600;

  var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.CANVAS, 'game', {
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

  var LINE_HEIGHT = 24;
  var MAX_MESSAGE_QUEUE_SIZE = GAME_HEIGHT / LINE_HEIGHT - 1;

  var KEY_CODE_ENTER = 13;

  var COLOR_WHITE = '#FFFFFF';
  var COLOR_BLACK = '#000000';
  var COLOR_GREEN = '#00FF00';

  var messageQueue = [];
  var showCursor = false;

  function create() {
    game.stage.setBackgroundColor(COLOR_BLACK);

    printMessage('小游♂戏 by yk');
    printMessageln('输入\"help\"开始游戏');

    var keyboard = game.input.keyboard;
    keyboard.addCallbacks(this, null, keyUp, keyPress);
    keyboard.addKey(Phaser.Keyboard.BACKSPACE);

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

  function renderDebug(message, line, isLast) {
    var text = message.text;
    if (message.showHint) {
      text = '> ' + text;
    } else {
      text = '  ' + text;
    }
    if (isLast && showCursor) {
      text += '_';
    }
    game.debug.text(text, 2, LINE_HEIGHT * (parseInt(line) + 1), COLOR_GREEN);
  }

  function keyUp(event) {
    console.log(event);
    switch (event.keyCode) {
      case KEY_CODE_ENTER:
        handleCommand();
        break;
    }
  }

  function keyPress(char) {
    if (char.charCodeAt() != KEY_CODE_ENTER) {
      appendCommand(char);
    }
  }

  function handleCommand() {
    var commandLine = getCommandLine().split(' ');

    if (commandLine.length < 1) {
      return;
    }
    var command = commandLine[0];

    switch (command) {
      case 'help':
        printMessageln('试试输入\"shabi\"');
        break;
      case 'shabi':
        printMessageln('有个大傻逼，叫作王中一');
        break;
      default:
        printMessageln('未知命令：' + command);
        break;
    }
  }

  function appendCommand(char) {
    messageQueue[messageQueue.length - 1].text += char;
  }

  function getCommandLine() {
    return messageQueue[messageQueue.length - 1].text;
  }

  function printMessage(text) {
    var message = new Object();
    message.text = text;

    messageQueue.push(message);
  }

  function printMessageln(text) {
    printMessage(text);
    newLine();
  }

  function newLine() {
    var command = new Object();
    command.text = '';
    command.showHint = true;

    messageQueue.push(command);
    while (messageQueue.length > MAX_MESSAGE_QUEUE_SIZE) {
      messageQueue.shift();
    }
  }
};
