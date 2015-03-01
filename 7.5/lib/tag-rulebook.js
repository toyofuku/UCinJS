var __ = require('underscore');

var TagRulebook = function(deletion_number, rules){
  this.deletion_number = deletion_number;
  this.rules = rules;
};

TagRulebook.prototype.next_string = function(string){
  return this.rule_for(string).follow(string).slice(this.deletion_number);
};

TagRulebook.prototype.rule_for = function(string){
  return __.detect(this.rules, function(rule){return rule.applies_to(string); });
};

TagRulebook.prototype.applies_to = function(string){
  return this.rule_for(string) !== undefined && string.length >= this.deletion_number;
};

module.exports = TagRulebook;
