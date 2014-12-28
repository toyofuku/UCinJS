var NFA = require('./nfa');

var NFADesign = function(start_state, accept_states, rulebook){
  this.start_state = start_state;
  this.accept_states = accept_states;
  this.rulebook = rulebook;
};

NFADesign.prototype.accepts = function(string){
  var nfa = this.to_nfa();
  nfa.read_string(string);
  return nfa.accepting();
};

NFADesign.prototype.to_nfa = function(){
  return new NFA([this.start_state], this.accept_states, this.rulebook);
};

module.exports = NFADesign;
