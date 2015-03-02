var __ = require('underscore');

var DPDA = function(current_configuration, accept_states, rulebook){
  this._current_configuration = current_configuration;
  this.accept_states = accept_states;
  this.rulebook = rulebook;
};

DPDA.prototype.accepting = function(){
  return __.include(this.accept_states, this.current_configuration().state);
};

DPDA.prototype.read_character = function(character){
  this._current_configuration = 
//    this.rulebook.next_configuration(this.current_configuration(), character);
    this.next_configuration(character);
};

DPDA.prototype.read_string = function(string){
  __.each( string.split(''), function(character){
    if(! this.is_stuck()){
      this.read_character(character);
    }
  }.bind(this));
};

DPDA.prototype.current_configuration = function(){
  return this.rulebook.follow_free_moves(this._current_configuration);
};

DPDA.prototype.next_configuration = function(character){
  if( this.rulebook.applies_to(this.current_configuration(), character) ){
    return this.rulebook.next_configuration(this.current_configuration(), character);
  } else {
    return this.current_configuration().stuck();
  }
};

DPDA.prototype.is_stuck = function(){
  return this._current_configuration.is_stuck();
};


module.exports = DPDA;
