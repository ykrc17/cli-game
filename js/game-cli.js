var MAX_MESSAGE_QUEUE_SIZE = 24;

var CLI = function() {
  this.lines = [];
  this.cursorPosition = 0;
}

CLI.prototype.getMessages = function() {
  return this.lines;
}

CLI.prototype.getMessage = function(index) {
  return this.lines[index];
}

CLI.prototype.isCommand = function(index) {
  return index == this.lines.length - 1
}

// 输入文字
CLI.prototype.appendCommand = function(char) {
  this.lines[this.lines.length - 1].text += char;
  this.cursorPosition++;
}

// 删除文字
CLI.prototype.shiftCommand = function(index) {
  var index = this.cursorPosition - 1;

  var command = this.getCommand()
  if (index >= 0 && index < command.length) {
    this.setCommand(command.substr(0, index) + command.substr(index + 1, command.length));
    this.cursorPosition--;
  }
}

CLI.prototype.deleteCommand = function() {
  var index = this.cursorPosition;

  var command = this.getCommand()
  if (index >= 0 && index < command.length) {
    this.setCommand(command.substr(0, index) + command.substr(index + 1, command.length));
  }
}

CLI.prototype.setCommand = function(command) {
  this.lines[this.lines.length - 1].text = command
}

CLI.prototype.getCommand = function() {
  return this.lines[this.lines.length - 1].text;
}

CLI.prototype.getCommandLength = function() {
  return this.lines[this.lines.length - 1].text.length;
}

CLI.prototype.printMessage = function(text) {
  var message = {
    text: text,
    showHint: false
  }

  this.lines.push(message);
}

CLI.prototype.printMessageln = function(text) {
  this.printMessage(text);
  this.newLine();
}

CLI.prototype.newLine = function() {
  var command = {
    text: '',
    showHint: true
  }

  this.lines.push(command);
  while (this.lines.length > MAX_MESSAGE_QUEUE_SIZE) {
    this.lines.shift();
  }
  this.cursorPosition = 0;
}

CLI.prototype.getCursorPosition = function() {
  return this.cursorPosition;
}

CLI.prototype.moveCursorLeft = function() {
  if (this.cursorPosition > 0) {
    this.cursorPosition--;
  }
}

CLI.prototype.moveCursorRight = function() {
  if (this.cursorPosition < getCommandLength()) {
    this.cursorPosition++;
  }
}
