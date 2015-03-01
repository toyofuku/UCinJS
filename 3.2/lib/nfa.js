var __ = require('underscore');

var NFA = function(current_states, accept_states, rulebook){
  this._current_states = current_states;
  this.accept_states = accept_states;
  this.rulebook = rulebook;
};

NFA.prototype.accepting = function(){
  return __.intersection(this.current_states(),this.accept_states).length > 0
};

NFA.prototype.read_character = function(character){
  this._current_states = this.rulebook.next_states(this.current_states(), character);
};

NFA.prototype.read_string = function(string){
  string.split('').forEach(function(character){
    this.read_character(character);
  }.bind(this));
};

NFA.prototype.current_states = function(){
  return this.rulebook.follow_free_moves(this._current_states)
         .filter(function (x, i, self){ return self.indexOf(x) === i; });
};

module.exports = NFA;
