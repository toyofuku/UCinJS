var util = require('util')
  , Pattern = require('./pattern')
  , FARule = require('../../3.1/lib/fa-rule')
  , NFARulebook = require('../../3.2/lib/nfa-rulebook')
  , NFADesign = require('../../3.2/lib/nfa-design');

var Repeat = function(pattern){
  this.pattern = pattern;
};

util.inherits(Repeat, Pattern);

Repeat.prototype.to_s = function(){
  return this.pattern.bracket(this.precedence()) + '*';
};

Repeat.prototype.precedence = function(){
  return 2;
};

Repeat.prototype.to_nfa_design = function(){
  var pattern_nfa_design = this.pattern.to_nfa_design()
    , start_state = {}
    , accept_states = pattern_nfa_design.accept_states.concat([start_state])
    , rules = pattern_nfa_design.rulebook.rules
    , extra_rules = pattern_nfa_design.accept_states.map(function(accept_state){
      return new FARule(accept_state, null, pattern_nfa_design.start_state);
    }).concat(
      [new FARule(start_state, null, pattern_nfa_design.start_state)]
    )
    , rulebook = new NFARulebook(rules.concat(extra_rules));

  return new NFADesign(start_state, accept_states, rulebook);
};

module.exports = Repeat;
