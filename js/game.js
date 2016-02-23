window.onload = function() {

  var GAME_WIDTH = 800;
  var GAME_HEIGHT = 600;

  var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.CANVAS, 'game', {
    preload: preload,
    create: create,
    update: update,
    render: render
  });

  var cli = new CLI();

  function preload() {

  }

  var LINE_HEIGHT = 24;

  var KEY_CODE_ENTER = Phaser.Keyboard.ENTER;
  var KEY_CODE_BACKSPACE = Phaser.Keyboard.BACKSPACE;
  var KEY_CODE_DELETE = Phaser.Keyboard.DELETE;
  var KEY_CODE_LEFT = Phaser.Keyboard.LEFT;
  var KEY_CODE_RIGHT = Phaser.Keyboard.RIGHT;

  var COLOR_WHITE = '#FFFFFF';
  var COLOR_BLACK = '#000000';
  var COLOR_GREEN = '#00FF00';

  var showCursor = false;

  function create() {
    game.stage.setBackgroundColor(COLOR_BLACK);

    cli.printMessage('小游♂戏 by yk');
    cli.printMessageln('输入\"help\"开始游戏');

    var keyboard = game.input.keyboard;
    keyboard.addCallbacks(this, null, keyUp, keyPress);
    keyboard.addKey(KEY_CODE_BACKSPACE);

    game.time.events.loop(500, function() {
      showCursor = !showCursor;
    });
  }

  function update() {}

  function render() {
    for (var i in cli.getMessages()) {
      renderDebug(i);
    }
  }

  function renderDebug(index) {
    var message = cli.getMessage(index);
    var text = message.text;
    if (message.showHint) {
      text = '> ' + text;
    } else {
      text = '  ' + text;
    }
    game.debug.text(text, 2, LINE_HEIGHT * (parseInt(index) + 1), COLOR_GREEN);
    if (cli.isCommand(index) && showCursor) {
      var cursorText = '';
      for (var i = 0; i < cli.getCursorPosition() + 2; i++) {
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
        cli.shiftCommand();
        break;
      case KEY_CODE_DELETE:
        cli.deleteCommand();
        break;
      case KEY_CODE_LEFT:
        cli.moveCursorLeft();
        break;
      case KEY_CODE_RIGHT:
        cli.moveCursorRight();
        break;
    }
  }

  function keyPress(char) {
    if (char.charCodeAt() != KEY_CODE_ENTER) {
      cli.appendCommand(char);
    }
  }

  function handleCommand() {
    var commandLine = cli.getCommand().split(' ');
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
        cli.printMessageln('试试输入\"hello\"');
        break;
      case 'hello':
        cli.printMessageln('hello world!');
        break;
      default:
        cli.printMessageln('未知命令：' + command);
        break;
    }
  }
};
