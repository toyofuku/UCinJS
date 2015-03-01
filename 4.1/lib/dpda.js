var __ = require('underscore');

var DPDA = function(current_configuration, accept_states, rulebook){
  this._current_configuration = current_configuration;
  this.accept_states = accept_states;
  this.rulebook = rulebook;
};

DPDA.prototype.accepting = function(){
  return __.include(this.accept_states, this._current_configuration.state);
};

DPDA.prototype.read_character = function(character){
  return this._current_configuration = 
    this.rulebook.next_configuration(this._current_configuration, character);
};

DPDA.prototype.read_string = function(string){
  return __.each( string.split(''), function(character){
    this.read_character(character);
  }.bind(this));
};

DPDA.prototype.current_configuration = function(){
  return this.rulebook.follow_free_moves(this._current_configuration);
};

module.exports = DPDA;
