var DFARulebook = function(rules){
  this.rules = rules;
};

DFARulebook.prototype.next_state = function(state, character){
  return this.rule_for(state, character).follow();
};

DFARulebook.prototype.rule_for = function(state, character){
  var _detect = this.rules.filter(function(rule){ return rule.applies_to(state, character); });
  return _detect.length > 0 ? _detect[0] : null;
};

module.exports = DFARulebook;
