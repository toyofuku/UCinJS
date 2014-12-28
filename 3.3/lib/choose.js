var util = require('util')
  , Pattern = require('./pattern')
  , FARule = require('../../3.1/lib/fa-rule')
  , NFARulebook = require('../../3.2/lib/nfa-rulebook')
  , NFADesign = require('../../3.2/lib/nfa-design');

var Choose = function(first, second){
  this.first = first;
  this.second = second;
};

util.inherits(Choose, Pattern);

Choose.prototype.to_s = function(){
  return [this.first, this.second].map(function(pattern){
    return pattern.bracket(this.precedence())
  }.bind(this)).join('|');
};

Choose.prototype.precedence = function(){
  return 0;
};

Choose.prototype.to_nfa_design = function(){
  var first_nfa_design = this.first.to_nfa_design()
    , second_nfa_design = this.second.to_nfa_design()
    , start_state = {}
    , accept_states = first_nfa_design.accept_states.concat(second_nfa_design.accept_states)
    , rules = first_nfa_design.rulebook.rules.concat(second_nfa_design.rulebook.rules)
    , extra_rules = [first_nfa_design, second_nfa_design].map(function(nfa_design){
    	return new FARule(start_state, null, nfa_design.start_state);
    })
    , rulebook = new NFARulebook(rules.concat(extra_rules));

    return new NFADesign(start_state, accept_states, rulebook);
};

module.exports = Choose;
