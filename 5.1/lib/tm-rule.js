var TMConfiguration = require('../lib/tm-configuration');

var TMRule = function(state, chracter, next_state, write_chracter, direction){
  this.state = state;
  this.chracter = chracter;
  this.next_state = next_state;
  this.write_chracter = write_chracter;
  this.direction = direction;
};

TMRule.prototype.applies_to = function(configuration){
  return this.state == configuration.state && this.chracter == configuration.tape.middle;
};

TMRule.prototype.follow = function(configuration){
  return new TMConfiguration(this.next_state, this.next_tape(configuration));
};

TMRule.prototype.next_tape = function(configuration){
  var written_tape = configuration.tape.write(this.write_chracter);
  switch(this.direction){
  case 'left':
    return written_tape.move_head_left();
    break;
  case 'right':
    return written_tape.move_head_right();
  }
};

module.exports = TMRule;
