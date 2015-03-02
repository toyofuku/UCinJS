var __ = require('underscore');

var NPDA = function(current_configurations, accept_states, rulebook){
  this._current_configurations = current_configurations;
  this.accept_states = accept_states;
  this.rulebook = rulebook;
};

NPDA.prototype.accepting = function(){
  return __.any( this.current_configurations(),
    function(config){
      return __.include(this.accept_states, config.state);
    }.bind(this)
  );
};

NPDA.prototype.read_character = function(character){
  this._current_configurations = 
    this.rulebook.next_configuration(this.current_configurations(), character);
};

NPDA.prototype.read_string = function(string){
  __.each( string.split(''), function(character){
    this.read_character(character);
  }.bind(this));
};

NPDA.prototype.current_configurations = function(){
  return this.rulebook.follow_free_moves(this._current_configurations);
};


module.exports = NPDA;
