var FARule = function(state, character, next_state){
  this.state = state;
  this.character = character;
  this.next_state = next_state;
};

FARule.prototype.applies_to = function(state, character){
  return this.state == state && this.character == character;
};

FARule.prototype.follow = function(){
  return this.next_state;
};

FARule.prototype.inspect = function(){
  return "#<FARule " + this.state.inspect() + 
    " --" + this.character +
    "--> " + this.next_state.inspect()
    ">";
};

module.exports = FARule;
