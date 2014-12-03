var DTMRulebook = function(rules){
  this.rules = rules;
};

DTMRulebook.prototype.next_configuration = function(configuration){
  return this.rule_for(configuration).follow(configuration);
};

DTMRulebook.prototype.rule_for = function(configuration){
  var _detect = this.rules.filter(function(rule){return rule.applies_to(configuration)});
  return _detect.length > 0 ? _detect[0] : null;
};

DTMRulebook.prototype.applies_to = function(configuration){
  return this.rule_for(configuration) !== null;
};

module.exports = DTMRulebook;
