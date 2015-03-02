
var STUCK_STATE = {};

var PDAConfiguration = function(state, stack){
  this.state = state;
  this.stack = stack;
};

PDAConfiguration.prototype.inspect = function(){
  return "#<PDAConfiguration state="+ this.state + ", stack=" + this.stack.inspect() + ">";
};

PDAConfiguration.prototype.stuck = function(){
  return new PDAConfiguration(STUCK_STATE, this.stack);
};

PDAConfiguration.prototype.is_stuck = function(){
  return this.state === STUCK_STATE;
};

module.exports = PDAConfiguration;
