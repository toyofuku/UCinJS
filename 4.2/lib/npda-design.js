var __ = require('underscore');

var Stack = require('../../4.1/lib/stack')
  , PDAConfiguration = require('../../4.1/lib/pda-configuration')
  , NPDA = require('./npda');


var NPDADesign = function(start_state, bottom_character, accept_states, rulebook){
  this.start_state = start_state;
  this.bottom_character = bottom_character;
  this.accept_states = accept_states;
  this.rulebook = rulebook;
};

NPDADesign.prototype.accepts = function(string){
  return __.tap( this.to_npda(), function(npda){ npda.read_string(string); }).accepting();
};

NPDADesign.prototype.to_npda = function(){
  var start_stack = new Stack([this.bottom_character]);
  var start_configuration = new PDAConfiguration(this.start_state, start_stack);
  return new NPDA([start_configuration], this.accept_states, this.rulebook);
};

module.exports = NPDADesign;
