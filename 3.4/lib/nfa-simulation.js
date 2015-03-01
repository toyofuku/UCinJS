var __ = require('underscore');

var FARule = require('../../3.1/lib/fa-rule')
  , DFADesign = require('../../3.1/lib/dfa-design')
  , DFARulebook = require('../../3.1/lib/dfa-rulebook');

var NFASimulation = function(nfa_design){
  this.nfa_design = nfa_design;
};

NFASimulation.prototype.next_state = function(state, character){
  var nfa = this.nfa_design.to_nfa(state);
  nfa.read_character(character);
  return nfa.current_states();
};

NFASimulation.prototype.rules_for = function(state){
  return this.nfa_design.rulebook.alphabet().map(function(character){
    return new FARule(state, character, this.next_state(state, character));
  }.bind(this));
};

NFASimulation.prototype.discover_states_and_rules = function(states){
  var _states = states.map(function(state){ return JSON.stringify( state ); })
  var rules = __.flatten( states.map(function(state){ return this.rules_for(state); }.bind(this)) );
  var more_states = __.uniq( rules.map(function(rule){ return JSON.stringify( rule.follow() ); }) );

  if(__.every(more_states,function(state){return __.contains(_states,state);})){
    return [states, rules];
  } else {
    var merged_states = __.union(_states, more_states).map(function(state){return JSON.parse(state);});
    return this.discover_states_and_rules( merged_states );
  }
};

NFASimulation.prototype.to_dfa_design = function(){

  var start_state = this.nfa_design.to_nfa().current_states();
  var _states_and_rules = this.discover_states_and_rules([start_state]);
  console.log(_states_and_rules);
  var accept_states = _states_and_rules[0].filter(function(state){ return this.nfa_design.to_nfa(state).accepting(); }.bind(this));
  return new DFADesign(start_state, accept_states, new DFARulebook(_states_and_rules[1]));

};

module.exports = NFASimulation;
