var util = require('util')
  , Pattern = require('./pattern')
  , FARule = require('../../3.1/lib/fa-rule')
  , NFARulebook = require('../../3.2/lib/nfa-rulebook')
  , NFADesign = require('../../3.2/lib/nfa-design');

var Concatenate = function(first, second){
  this.first = first;
  this.second = second;
};

util.inherits(Concatenate, Pattern);

Concatenate.prototype.to_s = function(){
  return [this.first, this.second].map(function(pattern){
    return pattern.bracket(this.precedence())
  }.bind(this)).join('');
};

Concatenate.prototype.precedence = function(){
  return 1;
};

Concatenate.prototype.to_nfa_design = function(){
  var first_nfa_design = this.first.to_nfa_design()
    , second_nfa_design = this.second.to_nfa_design()
    , start_state = first_nfa_design.start_state
    , accept_states = second_nfa_design.accept_states
    , rules = first_nfa_design.rulebook.rules.concat(second_nfa_design.rulebook.rules)
    , extra_rules = first_nfa_design.accept_states.map(function(state){
    	return new FARule(state, null, second_nfa_design.start_state);
    })
    , rulebook = new NFARulebook(rules.concat(extra_rules));

    return new NFADesign(start_state, accept_states, rulebook);
};

module.exports = Concatenate;
