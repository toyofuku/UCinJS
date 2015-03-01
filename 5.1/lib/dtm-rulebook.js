var __ = require('underscore');

var DTMRulebook = function(rules){
  this.rules = rules;
};

DTMRulebook.prototype.next_configuration = function(configuration){
  return this.rule_for(configuration).follow(configuration);
};

DTMRulebook.prototype.rule_for = function(configuration){
  return __.detect(this.rules, function(rule){return rule.applies_to(configuration); });
};

DTMRulebook.prototype.applies_to = function(configuration){
  return this.rule_for(configuration) !== undefined;
};

module.exports = DTMRulebook;
