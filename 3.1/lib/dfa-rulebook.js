var __ = require('underscore');

var DFARulebook = function(rules){
  this.rules = rules;
};

DFARulebook.prototype.next_state = function(state, character){
  return this.rule_for(state, character).follow();
};

DFARulebook.prototype.rule_for = function(state, character){
  return __.detect(this.rules, function(rule){ return rule.applies_to(state, character); });
};

module.exports = DFARulebook;
