var commands = [];
var cursorPosition = 0;

var MAX_MESSAGE_QUEUE_SIZE = 24;

function getMessages() {
  return commands;
}

function getMessage(index) {
  return commands[index];
}

function isCommand(index) {
  return index == commands.length - 1
}

// 输入文字
function appendCommand(char) {
  commands[commands.length - 1].text += char;
  cursorPosition++;
}

// 删除文字
function shiftCommand() {
  var index = cursorPosition - 1;

  if (getCommandLength() > 0) {
    setCommand(getCommand().substr(0, index) + getCommand().substr(index + 1, getCommandLength()));
    cursorPosition--;
  }
}

function setCommand(command) {
  commands[commands.length - 1].text = command
}

function getCommand() {
  return commands[commands.length - 1].text;
}

function getCommandLength() {
  return commands[commands.length - 1].text.length;
}

function printMessage(text) {
  var message = new Object();
  message.text = text;

  commands.push(message);
}

function printMessageln(text) {
  printMessage(text);
  newLine();
}

function newLine() {
  var command = new Object();
  command.text = '';
  command.showHint = true;

  commands.push(command);
  while (commands.length > MAX_MESSAGE_QUEUE_SIZE) {
    commands.shift();
  }
  cursorPosition = 0;
}

function getCursorPosition() {
  return cursorPosition;
}
