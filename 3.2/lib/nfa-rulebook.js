var NFARulebook = function(rules){
  this.rules = rules;
};

NFARulebook.prototype.next_states = function(states, character){
  var _next_states = states.map(function(state){
    return this.follow_rules_for(state, character);
  }.bind(this));
  return _next_states.length > 0 ?
    _next_states.reduce(function(a,b){ return a.concat(b);}) : [];
};

NFARulebook.prototype.follow_rules_for = function(state, character){
  return this.rules_for(state, character).map(function(rule){return rule.follow();});
};

NFARulebook.prototype.rules_for = function(state, character){
  return this.rules.filter(function(rule){return rule.applies_to(state, character);});
};

NFARulebook.prototype.follow_free_moves = function(states){
  var more_states = this.next_states(states, null);
  if(more_states.every(function(state){return states.indexOf(state) != -1;})){
    return states;    
  } else {
    return this.follow_free_moves(states.concat(more_states));
  }
};

module.exports = NFARulebook;
