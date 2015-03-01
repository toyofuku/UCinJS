var __ = require('underscore');

var DFA = function(current_state, accept_state, rulebook){
  this.current_state = current_state;
  this.accept_state = accept_state;
  this.rulebook = rulebook;
};

DFA.prototype.accepting = function(){
  return __.contains(
    this.accept_state
    .map(function(state){return JSON.stringify(state);}),
    JSON.stringify(this.current_state)
  );
};

DFA.prototype.read_character = function(character){
  this.current_state = this.rulebook.next_state(this.current_state, character);
};

DFA.prototype.read_string = function(string){
  string.split('').forEach(function(character){
    this.read_character(character);
  }.bind(this));
};

module.exports = DFA;
