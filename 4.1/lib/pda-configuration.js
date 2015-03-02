var PDAConfiguration = function(state, stack){
  this.state = state;
  this.stack = stack;
};

PDAConfiguration.prototype.inspect = function(){
  return "#<PDAConfiguration state="+ this.state + ", stack=" + this.stack.inspect() + ">";
};

module.exports = PDAConfiguration;
