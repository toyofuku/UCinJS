var __ = require('underscore');

var Stack = require('./stack')
  , PDAConfiguration = require('./pda-configuration')
  , DPDA = require('./dpda');


var DPDADesign = function(start_state, bottom_character, accept_states, rulebook){
  this.start_state = start_state;
  this.bottom_character = bottom_character;
  this.accept_states = accept_states;
  this.rulebook = rulebook;
};

DPDADesign.prototype.accepts = function(string){
  return __.tap( this.to_dpda(), function(dpda){ return dpda.read_string(string); }).accepting();
};

DPDADesign.prototype.to_dpda = function(){
  var start_stack = new Stack([this.bottom_character]);
  var start_configuration = new PDAConfiguration(this.start_state, start_stack);
  return new DPDA(start_configuration, this.accept_states, this.rulebook);
};

module.exports = DPDADesign;
