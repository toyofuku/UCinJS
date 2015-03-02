var __ = require('underscore');

var DPDARulebook = function(rules){
  this.rules = rules;
};

DPDARulebook.prototype.next_configuration = function(configuration, character){
	return this.rule_for(configuration, character).follow(configuration);
};

DPDARulebook.prototype.rule_for = function(configuration, character){
  return __.detect(this.rules, function(rule){ return rule.applies_to(configuration, character); });
};

DPDARulebook.prototype.applies_to = function(configuration, character){
  return this.rule_for(configuration, character) !== undefined
};

DPDARulebook.prototype.follow_free_moves = function(configuration){
  if(this.applies_to(configuration, null)){
  	return this.follow_free_moves(this.next_configuration(configuration, null));
  } else {
  	return configuration;
  }
};

module.exports = DPDARulebook;
