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

  var KEY_CODE_ENTER = 13;
  var KEY_CODE_BACKSPACE = Phaser.Keyboard.BACKSPACE;

  var COLOR_WHITE = '#FFFFFF';
  var COLOR_BLACK = '#000000';
  var COLOR_GREEN = '#00FF00';

  var showCursor = false;

  function create() {
    game.stage.setBackgroundColor(COLOR_BLACK);

    printMessage('小游♂戏 by yk');
    printMessageln('输入\"help\"开始游戏');

    var keyboard = game.input.keyboard;
    keyboard.addCallbacks(this, null, keyUp, keyPress);
    keyboard.addKey(KEY_CODE_BACKSPACE);

    game.time.events.loop(500, function() {
      showCursor = !showCursor;
    });
  }

  function update() {}

  function render() {
    for (var i in getMessages()) {
      renderDebug(i);
    }
  }

  function renderDebug(index) {
    var message = getMessage(index);
    var text = message.text;
    if (message.showHint) {
      text = '> ' + text;
    } else {
      text = '  ' + text;
    }
    game.debug.text(text, 2, LINE_HEIGHT * (parseInt(index) + 1), COLOR_GREEN);
    if (isCommand(index) && showCursor) {
      var cursorText = '';
      for (var i = 0; i < getCursorPosition() + 2; i++) {
        cursorText += ' ';
      }
      game.debug.text(cursorText + '_', 2, LINE_HEIGHT * (parseInt(index) + 1), COLOR_GREEN);
    }
  }

  function keyUp(event) {
    console.log(event);
    switch (event.keyCode) {
      case KEY_CODE_ENTER:
        handleCommand();
        break;
      case KEY_CODE_BACKSPACE:
        shiftCommand();
        break;
    }
  }

  function keyPress(char) {
    if (char.charCodeAt() != KEY_CODE_ENTER) {
      appendCommand(char);
    }
  }

  function handleCommand() {
    var commandLine = getCommand().split(' ');
    if (commandLine.length < 1) {
      return;
    }

    var command = commandLine[0];
    if (command.length < 1) {
      newLine();
      return;
    }

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
};
