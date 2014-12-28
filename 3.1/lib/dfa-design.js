var DFA = require('./dfa');

var DFADesign = function(start_state, accept_state, rulebook){
  this.start_state = start_state;
  this.accept_state = accept_state;
  this.rulebook = rulebook;
};

DFADesign.prototype.to_dfa = function(){
  return new DFA(this.start_state, this.accept_state, this.rulebook);
};

DFADesign.prototype.accepts = function(string){
  var dfa = this.to_dfa();
  dfa.read_string(string);
  return dfa.accepting();
};

module.exports = DFADesign;
