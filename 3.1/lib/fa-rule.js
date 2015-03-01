var FARule = function(state, character, next_state){
  this.state = state;
  this.character = character;
  this.next_state = next_state;
};

FARule.prototype.applies_to = function(state, character){
  if(JSON.stringify(this.state) == '{}'){
    return this.state == state && this.character == character;
  }else{
    return JSON.stringify(this.state) == JSON.stringify(state) && this.character == character;  	
  }
};

FARule.prototype.follow = function(){
  return this.next_state;
};

FARule.prototype.inspect = function(){
  return "#<FARule " + JSON.stringify(this.state) + 
    " --" + this.character +
    "--> " + JSON.stringify(this.next_state) +
    ">";
};

module.exports = FARule;
